# VaaniGuard

VaaniGuard is a Python prototype for classifying message text as **scam** or **legitimate**. It uses the cleaned Sentinel dataset and scikit-learn baseline models.

## What is included

- A cleaned dataset with 14,000 messages and 10 columns. The `binary_label` column contains 8,400 scam examples (`1`) and 5,600 legitimate examples (`0`).
- A standard baseline training script that removes unusable/conflicting duplicate messages, makes a stratified 80/20 train/test split, and trains a TF-IDF + Logistic Regression pipeline.
- A grouped baseline that groups highly similar messages before splitting, to reduce near-duplicate leakage between training and test data. It evaluates one split from a five-fold `StratifiedGroupKFold` setup.
- A near-duplicate audit for the standard split, plus inspection of the baseline model's most influential features.
- Dataset and label inspection scripts.
- Two serialized model files: the standard baseline and the grouped baseline.

This repository currently contains the dataset, training/evaluation scripts, and saved models. It does not include a web app, API, or interactive prediction interface.

## Project files

| File | Purpose |
|---|---|
| `vaaniguard_cleaned_sentinel_dataset.csv` | Dataset used by the scripts |
| `check_dataset.py` | Prints dataset dimensions, columns, missing values, and label distribution |
| `inspect_labels.py` | Shows source labels, inferred meanings, binary-label mapping, and sample messages |
| `train_baseline.py` | Trains/evaluates the standard TF-IDF + Logistic Regression baseline; saves `vaaniguard_baseline.pkl` |
| `audit_baseline.py` | Audits near-duplicate train/test messages and prints influential baseline features |
| `train_grouped_baseline.py` | Trains/evaluates the grouped baseline; saves `vaaniguard_grouped_baseline.pkl` |
| `vaaniguard_baseline.pkl` | Saved standard baseline model |
| `vaaniguard_grouped_baseline.pkl` | Saved grouped baseline model |

The training scripts print accuracy, a classification report, and a confusion matrix when run. Results depend on the dataset and script version; no performance guarantee is implied.

## Setup

Clone the repository using your team's repository URL, then enter the project folder:

```bash
git clone <repository-url>
cd VaaniGuard
```

## Team workflow

### First push (repository owner)

Create an **empty** repository on GitHub, then run these commands from this project folder, replacing the URL with the one GitHub provides:

```bash
git init -b main
git add .
git commit -m "Add VaaniGuard baseline"
git remote add origin <repository-url>
git push -u origin main
```

The `.gitignore` keeps the local virtual environment and Python cache files out of the repository. Before pushing, confirm that you have permission to share the dataset and that it contains no private information.

### Clone and create a branch (teammates)

```bash
git clone <repository-url>
cd VaaniGuard
git switch -c feature/<short-description>
```

After making changes, commit and push the branch, then open a pull request on GitHub:

```bash
git add <files-you-changed>
git commit -m "Describe your change"
git push -u origin feature/<short-description>
```

Use a descriptive branch name, such as `feature/improve-text-cleaning` or `fix/grouped-split`. Open pull requests against `main` rather than pushing team changes directly to it.

Python 3.10 or newer is recommended. Create and activate a virtual environment, then install the dependencies:

### Windows PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install pandas scikit-learn scipy joblib
```

If PowerShell prevents environment activation, use the environment's Python directly:

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

## Run the scripts

Run these commands from the project directory so the scripts can find the CSV and save model files there:

```bash
python check_dataset.py
python inspect_labels.py
python train_baseline.py
python audit_baseline.py
python train_grouped_baseline.py
```

`audit_baseline.py` expects `vaaniguard_baseline.pkl` to exist. Run `train_baseline.py` first if that model file is missing. Both training scripts overwrite their corresponding `.pkl` file when run.

## Notes

- `text_cleaned` is used as the model input and `binary_label` as the target.
- The standard baseline uses a stratified random split. The grouped baseline instead keeps connected groups of similar messages together across the split.
- The scripts use fixed random seeds for repeatable splits, but library versions and dataset changes can affect results.
