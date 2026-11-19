# VaaniGuard

VaaniGuard is a Python prototype for detecting scam messages in payment-related text.
The repository currently includes English Sentinel data, a Kannada/English pilot dataset,
baseline TF-IDF and Logistic Regression models, and scripts for training, auditing, and
manual testing.

This project is a model prototype. It does not currently include a web application, API,
database, or automated deployment pipeline.

## Project overview

### English/Sentinel baseline

The English/Sentinel pipeline uses `vaaniguard_cleaned_sentinel_dataset.csv`, which contains
14,000 records and 10 columns. The `text_cleaned` column is used as input and `binary_label`
is used as the target (`1` = scam, `0` = legitimate/benign).

Two approaches are provided:

- A standard stratified 80/20 train/test split.
- A grouped split that identifies highly similar character sequences and keeps each similar
  message family within a single fold, reducing near-duplicate leakage.

### Kannada/English pilot

The pilot dataset contains 180 records:

- The evaluation split has 60 records: 30 legitimate and 30 scam.
- The synthetic expansion split has 120 records: 60 legitimate and 60 scam.
- Each language format has 60 records in total.
- The full prepared pilot has 90 legitimate and 90 scam records.

The dataset covers Kannada script, romanized Kannada, and Kannada-English mixed text.
Synthetic samples are for training/pilot experimentation and should be reviewed by native
Kannada speakers before production use.

## Repository files

| File | Purpose |
|---|---|
| `check_dataset.py` | Reports the Sentinel dataset shape, columns, missing values, and label distributions. |
| `inspect_labels.py` | Explains source labels, inferred meanings, the binary mapping, and scam categories. |
| `audit_baseline.py` | Recreates the standard split, reports train/test near duplicates, and lists influential model features. |
| `train_baseline.py` | Trains and evaluates the standard TF-IDF + Logistic Regression model. Saves `vaaniguard_baseline.pkl`. |
| `train_grouped_baseline.py` | Builds similar-message groups, evaluates a grouped cross-validation fold, and saves `vaaniguard_grouped_baseline.pkl`. |
| `prepare_kannada_data.py` | Standardizes formats and labels in the raw Kannada pilot and creates `vaaniguard_kannada_prepared.csv`. |
| `train_kannada_mixed.py` | Trains and evaluates the Kannada/English character n-gram model and saves `vaaniguard_kannada_baseline.pkl`. |
| `test_kannada_model.py` | Runs an interactive Kannada/English message prediction prompt using the saved Kannada model. |
| `vaaniguard_cleaned_sentinel_dataset.csv` | 14,000-record English/Sentinel source dataset. |
| `vaaniguard_kannada_mixed_pilot_expanded_180.csv` | Raw 180-record Kannada/English pilot dataset. |
| `vaaniguard_kannada_prepared.csv` | UTF-8 prepared copy produced by `prepare_kannada_data.py`. |
| `vaaniguard_baseline.pkl` | Saved standard English/Sentinel model. |
| `vaaniguard_grouped_baseline.pkl` | Saved grouped English/Sentinel model. |
| `vaaniguard_kannada_baseline.pkl` | Saved Kannada/English character n-gram model. |
| `.gitignore` | Excludes the local `.venv` environment and Python cache files. |

## Setup

Python 3.10 or newer is recommended. The scripts require `pandas`, `scikit-learn`, `scipy`,
and `joblib`.

Run commands from the project root.

## Clone the repository

Replace `<repository-url>` with the GitHub repository URL:

### Windows PowerShell

```powershell
git clone <repository-url>
cd VaaniGuard
```

### macOS / Linux

```bash
git clone <repository-url>
cd VaaniGuard
```

## Install dependencies

Create a virtual environment inside the cloned project directory, activate it, and install
the required Python packages.

### Windows PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install pandas scikit-learn scipy joblib
```

If script execution is blocked by PowerShell, use the virtual environment executable directly:

```powershell
.\.venv\Scripts\python.exe -m pip install pandas scikit-learn scipy joblib
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install pandas scikit-learn scipy joblib
```

## Run the English/Sentinel scripts

```bash
python check_dataset.py
python inspect_labels.py
python train_baseline.py
python audit_baseline.py
python train_grouped_baseline.py
```

Run `train_baseline.py` before `audit_baseline.py` if `vaaniguard_baseline.pkl` is missing.
Each training script overwrites its matching model file.

The standard pipeline removes missing/empty text, conflicting duplicate labels, and duplicate
messages before training. The grouped pipeline creates character-TF-IDF groups with cosine
similarity of at least 0.90 and uses `StratifiedGroupKFold` with five folds.

## Run the Kannada/English pilot

```bash
python prepare_kannada_data.py
python train_kannada_mixed.py
python test_kannada_model.py
```

The preparation script:

- Skips the title row in the raw pilot CSV.
- Trims and lowercases language and label values.
- Standardizes selected language-format names.
- Writes `vaaniguard_kannada_prepared.csv` with UTF-8 BOM encoding.

The training script uses the preassigned `synthetic_expansion_pilot` split for training and
`evaluation_pilot` for evaluation. It trains a character-level TF-IDF + Logistic Regression
pipeline and prints overall and language-format-specific results.

To stop the interactive tester, enter `exit`.

```text
Enter message: ₹5000 reward valid only after an advance fee
Prediction: SCAM
```

## Model behavior

- Standard and grouped English/Sentinel models use word unigrams/bigrams.
- The Kannada/English pilot model uses character n-grams from 2 to 5 characters.
- Training uses fixed random seeds where the scripts expose them.
- Accuracy and classification reports depend on the exact dataset, library versions, split,
  and model settings. Re-running a training script overwrites the saved model.
- These prototypes may misclassify unfamiliar language, new scam patterns, and legitimate
  payment notices. They should not be used as the sole security or financial decision-maker.

## GitHub publishing

Create an empty GitHub repository without initializing a README, license, or `.gitignore`.
Then run the following from this project directory:

```powershell
git init -b main
git add .
git commit -m "Add VaaniGuard baseline"
git remote add origin <repository-url>
git push -u origin main
```

Confirm that you have permission to share all datasets and that they contain no private,
personal, or sensitive information before publishing.
