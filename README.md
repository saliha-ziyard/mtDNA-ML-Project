cat > README.md << 'EOF'
# mtDNA Analysis Project - RECOM 2026

mitoMatch: A Machine Learning Approach to Identify Human Relatedness Using Mitochondrial DNA Hypervariable Region I and II

Complete mtDNA prediction system for ethnicity and geolocation analysis based on mitochondrial DNA sequences.

## 📁 Repository Structure
```
mtDNA-ML-Project/
├── datasets/
│   ├── holdoutDataset/
│   │   └── hvr1_hvr2_cleaned_sequences_validation.csv
│   └── modelTrainingDataset/
│       ├── hvr1_cleaned_sequences.csv
│       ├── hvr2_cleaned_sequences.csv
│       └── hvr1_hvr2_cleaned_sequences.csv
├── notebooks/
│   ├── Ethnicity/
│   │   ├── HVR1_ethnicity.ipynb
│   │   ├── HVR2_ethnicity.ipynb
│   │   └── HVR2andCombinedEthnicity.ipynb
│   |── Geolocation/
│   |   ├── HVR2andCombinedGeo.ipynb
│   |   ├── HVR1_geo_loc.ipynb
│   |── Step1ExtractionAndCleaning.ipynb
│   |── unseenDatasetExtraction.ipynb
|   
├── README.md
└── .gitignore

## 🚀 Quick Start
```bash
cd mtdna-prediction-tool
npm install
pip install -r requirements.txt
npm run dev
```

Application runs at: `http://localhost:5173`
