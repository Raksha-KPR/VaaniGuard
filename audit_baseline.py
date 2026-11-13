
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# Load dataset
df = pd.read_csv("vaaniguard_cleaned_sentinel_dataset.csv")
df = df[["text_cleaned", "binary_label"]].dropna()
df["text_cleaned"] = df["text_cleaned"].astype(str).str.strip()
df = df[df["text_cleaned"] != ""]
df = df.drop_duplicates(subset="text_cleaned")

X = df["text_cleaned"]
y = df["binary_label"].astype(int)

# Recreate the original split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Character-level similarity analysis
vectorizer = TfidfVectorizer(
    analyzer="char_wb",
    ngram_range=(3, 5),
    min_df=2,
    max_features=100000
)

X_all = vectorizer.fit_transform(
    pd.concat([X_train, X_test])
)

train_vectors = X_all[:len(X_train)]
test_vectors = X_all[len(X_train):]

# Find nearest training message for every test message
nn = NearestNeighbors(
    n_neighbors=1,
    metric="cosine"
)

nn.fit(train_vectors)

distances, indices = nn.kneighbors(test_vectors)
similarities = 1 - distances.flatten()

print("\nNEAR-DUPLICATE AUDIT")

for threshold in [0.90, 0.95, 0.99]:
    count = (similarities >= threshold).sum()
    print(f"Similarity >= {threshold}: {count} test messages")

# Display highly similar examples
print("\nHIGHLY SIMILAR TRAIN-TEST PAIRS")

for i in similarities.argsort()[::-1][:10]:
    train_index = indices[i][0]

    print("\nSimilarity:", round(similarities[i], 4))
    print("Test label:", y_test.iloc[i])
    print("Train label:", y_train.iloc[train_index])
    print("Test message:", X_test.iloc[i][:250])
    print("Train message:", X_train.iloc[train_index][:250])

# Inspect important model features
model = joblib.load("vaaniguard_baseline.pkl")

classifier = model.named_steps["classifier"]
features = model.named_steps["tfidf"].get_feature_names_out()
coefficients = classifier.coef_[0]

print("\nTOP SCAM-ASSOCIATED FEATURES")
for i in coefficients.argsort()[-20:][::-1]:
    print(features[i], round(coefficients[i], 4))

print("\nTOP LEGITIMATE-ASSOCIATED FEATURES")
for i in coefficients.argsort()[:20]:
    print(features[i], round(coefficients[i], 4))
