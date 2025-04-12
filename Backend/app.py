from flask import Flask, request, jsonify
import joblib
import re
import numpy as np
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import StandardScaler

# Load pre-trained models and transformers
ml_model_only = joblib.load('./model/hvr1_ethnicity_model_files/gradient_boosting_classifier.pkl') 
scaler_kmer = joblib.load('./model/hvr1_ethnicity_model_files/scaler_kmer.pkl') 
kmer_vectorizer = joblib.load('./model/hvr1_ethnicity_model_files/kmer_vectorizer.pkl') 
label_encoder = joblib.load('./model/hvr1_ethnicity_model_files/label_encoder.pkl')  

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Preprocess sequence by cleaning (removes anything other than A, T, C, G)
def preprocess_sequence(sequence):
    sequence = re.sub(r'[^ATCGatcg]', '', sequence)
    if not sequence:  # if the sequence becomes empty after cleaning
        raise ValueError("Invalid sequence: The sequence contains no valid characters (A, T, C, G).")
    return sequence.upper()

# Generate k-mers (substrings) of length k
def generate_kmers(sequence, k=4):
    return [sequence[i:i+k] for i in range(len(sequence) - k + 1)]

# Vectorize sequences using the k-mer model (for HVR1 only)
def vectorize_hvr1_sequence(hvr1, k=4):
    hvr1_kmers = generate_kmers(hvr1, k)
    return kmer_vectorizer.transform([' '.join(hvr1_kmers)]).toarray()

# Define the prediction function for the ML model only
def predict_ethnicity_ml_model_only(sequence, model_type="hvr1_ethnicity_model_files"):
    # Preprocess sequence
    clean_sequence = preprocess_sequence(sequence)
    
    # Convert sequence to feature vector using k-mer encoding
    input_vector = vectorize_hvr1_sequence(clean_sequence)
    
    # Scale the input features using the pre-trained scaler
    input_vector_scaled = scaler_kmer.transform(input_vector)
    
    # Get raw probabilities for each class
    probability_scores = ml_model_only.predict_proba(input_vector_scaled)[0]
    
    # Decode the labels back to ethnicities
    ethnicity_labels = label_encoder.classes_
    
    # Get the predicted class (highest probability)
    predicted_index = np.argmax(probability_scores)
    predicted_ethnicity = ethnicity_labels[predicted_index]
    
    # Convert probabilities to percentages and create a dictionary
    ethnicity_probabilities = {
        ethnicity_labels[i]: round(float(probability_scores[i]) * 100, 2) 
        for i in range(len(ethnicity_labels))
    }
    
    return predicted_ethnicity, ethnicity_probabilities

@app.route("/", methods=["GET"])
def home():
    return "Flask API is Running!"
 
# Define the /predict_ml_model_only route
@app.route("/predict_ml_model_only", methods=["POST"])
def predict_ml_model_only_endpoint():
    data = request.get_json()
    
    try:
        # Extract sequence and model_type from the request
        sequence = data.get("sequence")
        model_type = data.get("model_type", "hvr1_ethnicity_model_files")
        
        # Check if sequence is provided
        if not sequence:
            return jsonify({"error": "Sequence is required!"}), 400
        
        # Validate the sequence length - adjust as needed for different types
        if len(sequence) < 10:  # Lowered for testing, adjust based on your needs
            raise ValueError("Invalid sequence length: The sequence is too short.")
        
        # Predict the ethnicity using the machine learning model
        ethnicity, probabilities = predict_ethnicity_ml_model_only(sequence, model_type)
        
        return jsonify({
            "prediction": ethnicity, 
            "probabilities": probabilities,
            "model_version": "v1.0"
        })
    
    except ValueError as ve:
        return jsonify({"error": f"Value Error: {str(ve)}"}), 400
    except KeyError as ke:
        return jsonify({"error": f"Key Error: {str(ke)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)