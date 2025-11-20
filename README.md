cat > README.md << 'EOF'
# mitoMatch: A Machine Learning Approach to Identify Human Relatedness Using Mitochondrial DNA Hypervariable Region I and II

Complete mtDNA prediction system for ethnicity and geolocation analysis based on mitochondrial DNA sequences.

## 📁 Repository Structure
```
mtDNA-ML-Project/
├── datasets/
│   ├── holdoutDataset/
│   │   └── hvr1_hvr2_cleaned_sequences_validation.csv  # can be used for testing
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
├── mtdna-prediction-tool/    # Web application
│   ├── src/                  # React frontend
│   ├── utils/                # Python ML utilities
│   ├── api/                  # API endpoints
│   ├── model/                # Trained models
│   └── app.py                # Flask backend
├── README.md
└── .gitignore

## 🚀 Quick Start

git clone https://github.com/saliha-ziyard/mtDNA-ML-Project.git
cd mtdna-prediction-tool
npm install
pip install -r requirements.txt
npm install jspdf html2canvas recharts
npm run dev

Once inside the website
A user-friendly React + Flask web interface is included in `mtdna-prediction-tool/` for real-time mtDNA-based ancestry prediction. 

1. **Open the Application** - Application runs at: `http://localhost:5173`
2. **Navigate to Application Page** - Click on **"Application"** in the top navigation bar → scroll down → click the **"Get Started"** button.
3. **Choose Prediction Task** - Ethnicity Prediction or Geographic Location Prediction
4. **Input mtDNA Sequence** - Sequences can be taken from ├── datasets/
   ├── holdoutDataset/
        └── hvr1_hvr2_cleaned_sequences_validation.csv
5. **Click on Predict** - System instantly returns predicted results with Confidennce Scores (%)
6. **Download Report** - Export prediction as PDF

