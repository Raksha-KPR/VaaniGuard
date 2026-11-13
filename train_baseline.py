
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# 1. Load dataset
df = pd.read_csv("vaaniguard_cleaned_sentinel_dataset.csv")

# 2. Select required columns
df = df[["text_cleaned", "binary_label"]].copy()

# Remove missing and empty text
df = df.dropna()
df["text_cleaned"] = df["text_cleaned"].astype(str).str.strip()
df = df[df["text_cleaned"] != ""]

# 3. Check and handle duplicate messages
conflicts = (
    df.groupby("text_cleaned")["binary_label"].nunique()
)
ambiguous_texts = conflicts[conflicts > 1].index

print("Conflicting duplicate messages:", len(ambiguous_texts))

df = df[~df["text_cleaned"].isin(ambiguous_texts)]
df = df.drop_duplicates(subset="text_cleaned")

print("Dataset after cleaning:", df.shape)

# 4. Separate features and labels
X = df["text_cleaned"]
y = df["binary_label"].astype(int)

# 5. Split dataset (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))

# 6. Create TF-IDF + Logistic Regression pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(
        max_features=30000,
        ngram_range=(1, 2),
        min_df=2,
        sublinear_tf=True
    )),
    ("classifier", LogisticRegression(
        max_iter=1000,
        random_state=42
    ))
])

# 7. Train model
print("\nTraining baseline model...")

model.fit(X_train, y_train)

print("Training completed!")

# 8. Make predictions
y_pred = model.predict(X_test)

# 9. Evaluate model
print("\n========== MODEL EVALUATION ==========")

print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(
    y_test,
    y_pred,
    target_names=["Legitimate", "Scam"],
    zero_division=0
))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# 10. Save trained model
joblib.dump(model, "vaaniguard_baseline.pkl")

print("\nModel saved as vaaniguard_baseline.pkl")
