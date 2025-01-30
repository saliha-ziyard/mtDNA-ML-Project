# from flask import Flask, jsonify

# app = Flask(__name__)

# # Define a route for the root URL
# @app.route("/")
# def home():
#     return "Welcome to the mtDNA Ethnicity Prediction API!"

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, request, jsonify
import joblib
import re
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import PCA
from flask_cors import CORS

# Load pre-trained models
rf_model_pca = joblib.load('./model/rf_model_pca.pkl')  # Load Random Forest model
vectorizer = joblib.load('./model/vectorizer.pkl')  # Load Vectorizer
pca = joblib.load('./model/pca_model.pkl')  # Load PCA model

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Preprocess the sequence
def preprocess_sequence(sequence):
    sequence = re.sub(r'[^ATCGatcg]', '', sequence)
    return sequence.upper()

# Generate k-mers
def generate_kmers(sequence, k=6):
    return [sequence[i:i+k] for i in range(len(sequence) - k + 1)]

# Vectorize sequences
def vectorize_sequences(hvr1, hvr2, k=6):
    hvr1_kmers = generate_kmers(hvr1, k)
    hvr2_kmers = generate_kmers(hvr2, k)
    combined_kmers = hvr1_kmers + hvr2_kmers
    return vectorizer.transform([' '.join(combined_kmers)]).toarray()

# Define the ethnicity prediction function
def predict_ethnicity(hvr1, hvr2):
    hvr1_clean = preprocess_sequence(hvr1)
    hvr2_clean = preprocess_sequence(hvr2)
    input_vector = vectorize_sequences(hvr1_clean, hvr2_clean)
    input_vector_pca = pca.transform(input_vector)
    prediction = rf_model_pca.predict(input_vector_pca)
    ethnicity_labels = ["Asian", "Caucasian", "African"]
    return ethnicity_labels[prediction[0]]

# Define the /predict route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    try:
        # Extract HVR1 and HVR2 sequences from the request
        hvr1 = data.get("hvr1")
        hvr2 = data.get("hvr2")

        if not hvr1 or not hvr2:
            return jsonify({"error": "Both HVR1 and HVR2 sequences are required!"}), 400
        
        # Get the prediction
        ethnicity = predict_ethnicity(hvr1, hvr2)

        return jsonify({"ethnicity": ethnicity})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
