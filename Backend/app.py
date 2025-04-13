# from flask import Flask, request, jsonify
# import joblib
# import re
# import numpy as np
# from flask_cors import CORS
# from sklearn.preprocessing import LabelEncoder
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.preprocessing import StandardScaler

# class EthnicityPredictor:
#     def __init__(self,
#                  label_encoder_path='./model/combined_ethnicity_model_files/label_encoder.pkl',
#                  vectorizer_path='./model/combined_ethnicity_model_files/kmer_vectorizer.pkl',
#                  scaler_path='./model/combined_ethnicity_model_files/scaler_kmer.pkl',
#                  classifier_path='./model/combined_ethnicity_model_files/gradient_boosting_classifier.pkl'):
#         """
#         Initialize the predictor by loading saved model components
#         """
#         # Load saved model components
#         self.label_encoder = joblib.load(label_encoder_path)
#         self.vectorizer = joblib.load(vectorizer_path)
#         self.scaler = joblib.load(scaler_path)
#         self.classifier = joblib.load(classifier_path)
        
#         # Use classes from label encoder
#         self.class_names = self.label_encoder.classes_

#     def predict(self, sequences):
#         """
#         Predict ethnicity for given sequences
#         """
#         # Ensure sequences is a list
#         if isinstance(sequences, str):
#             sequences = [sequences]

#         # Convert sequences to strings
#         sequences = [str(seq) for seq in sequences]

#         # Vectorize sequences
#         X_kmer = self.vectorizer.transform(sequences)

#         # Scale features
#         X_scaled = self.scaler.transform(X_kmer)

#         # Predict
#         y_pred_encoded = self.classifier.predict(X_scaled.toarray())

#         # Decode predictions
#         return [self.class_names[pred] for pred in y_pred_encoded]

#     def predict_proba(self, sequences):
#         """
#         Predict ethnicity probabilities for given sequences
#         """
#         # Ensure sequences is a list
#         if isinstance(sequences, str):
#             sequences = [sequences]

#         # Convert sequences to strings
#         sequences = [str(seq) for seq in sequences]

#         # Vectorize sequences
#         X_kmer = self.vectorizer.transform(sequences)

#         # Scale features
#         X_scaled = self.scaler.transform(X_kmer)

#         # Predict probabilities
#         y_pred_proba = self.classifier.predict_proba(X_scaled.toarray())

#         # Convert to percentages and format
#         result = []
#         for proba in y_pred_proba:
#             result.append({
#                 ethnicity: round(float(probability) * 100, 2)
#                 for ethnicity, probability in zip(self.class_names, proba)
#             })
        
#         return result

# # Load pre-trained models for geo-location prediction (using random forest and k=5)
# geo_label_encoder = joblib.load('./model/hvr1_geo_location_files/label_encoder.joblib')
# geo_vectorizer = joblib.load('./model/hvr1_geo_location_files/kmer_vectorizer.joblib')
# geo_scaler = joblib.load('./model/hvr1_geo_location_files/scaler_kmer.joblib')
# geo_classifier = joblib.load('./model/hvr1_geo_location_files/random_forest_model.joblib')

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Preprocess sequence by cleaning (removes anything other than A, T, C, G)
# def preprocess_sequence(sequence):
#     sequence = re.sub(r'[^ATCGatcg]', '', sequence)
#     if not sequence:  # if the sequence becomes empty after cleaning
#         raise ValueError("Invalid sequence: The sequence contains no valid characters (A, T, C, G).")
#     return sequence.upper()

# # Generate k-mers specifically for geo-location with k=5
# def generate_geo_kmers(sequence, k=5):
#     return [sequence[i:i+k] for i in range(len(sequence) - k + 1)]

# # Function for geo-location prediction using k=5
# def predict_geo_location(hvr1_sequence):
#     # Preprocess sequence
#     clean_sequence = preprocess_geo_sequence(hvr1_sequence)
    
#     # Generate k-mers with k=5 for geo-location prediction
#     kmers = generate_geo_kmers(clean_sequence, k=5)
    
#     # Process sequence for geo-location prediction model
#     # Apply K-mer transformation
#     X_kmer = geo_vectorizer.transform([' '.join(kmers)])
    
#     # Scale features
#     X_scaled = geo_scaler.transform(X_kmer)
    
#     # Get raw probabilities for each class
#     probability_scores = geo_classifier.predict_proba(X_scaled)[0]
    
#     # Decode the labels back to geo-locations
#     geo_location_labels = geo_label_encoder.classes_
    
#     # Get the predicted class (highest probability)
#     predicted_index = np.argmax(probability_scores)
#     predicted_geo_location = geo_location_labels[predicted_index]
    
#     # Convert probabilities to percentages and create a dictionary
#     geo_location_probabilities = {
#         geo_location_labels[i]: round(float(probability_scores[i]) * 100, 2) 
#         for i in range(len(geo_location_labels))
#     }
    
#     return predicted_geo_location, geo_location_probabilities

# # Preprocess sequence for geo-location prediction
# def preprocess_geo_sequence(sequence):
#     # Replace non-ACGT characters with 'A' as per the geo-location model preprocessing
#     sequence = re.sub(r'[^ACGTacgt]', 'A', sequence.upper())
#     return sequence

# @app.route("/", methods=["GET"])
# def home():
#     return "Flask API is Running!"

# # Add new endpoint for concatenated HVR1 and HVR2 sequences
# @app.route("/predict_concatenated", methods=["POST"])
# def predict_concatenated_endpoint():
#     data = request.get_json()
    
#     try:
#         # Extract both HVR1 and HVR2 sequences from the request
#         hvr1_sequence = data.get("hvr1_sequence")
#         hvr2_sequence = data.get("hvr2_sequence")
#         model_type = data.get("model_type", "combined_ethnicity")
        
#         # Check if both sequences are provided
#         if not hvr1_sequence or not hvr2_sequence:
#             return jsonify({"error": "Both HVR1 and HVR2 sequences are required!"}), 400
        
#         # Validate the sequence lengths
#         if len(hvr1_sequence) < 10 or len(hvr2_sequence) < 10:
#             raise ValueError("Invalid sequence length: One or both sequences are too short.")
        
#         # Preprocess sequences
#         clean_hvr1 = preprocess_sequence(hvr1_sequence)
#         clean_hvr2 = preprocess_sequence(hvr2_sequence)
        
#         # Combine sequences as in CoLab implementation
#         combined_sequence = clean_hvr1 + clean_hvr2
        
#         # Initialize the predictor
#         predictor = EthnicityPredictor()
        
#         # Predict ethnicity
#         ethnicity = predictor.predict(combined_sequence)[0]
        
#         # Get probabilities
#         probabilities = predictor.predict_proba(combined_sequence)[0]
        
#         return jsonify({
#             "prediction": ethnicity,
#             "probabilities": probabilities,
#             "model_version": "v1.0-concatenated"
#         })
    
#     except ValueError as ve:
#         return jsonify({"error": f"Value Error: {str(ve)}"}), 400
#     except KeyError as ke:
#         return jsonify({"error": f"Key Error: {str(ke)}"}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Add new endpoint for geo-location prediction using only HVR1
# @app.route("/predict_geo_location", methods=["POST"])
# def predict_geo_location_endpoint():
#     data = request.get_json()
    
#     try:
#         # Extract HVR1 sequence from the request
#         hvr1_sequence = data.get("hvr1_sequence")
        
#         # Check if sequence is provided
#         if not hvr1_sequence:
#             return jsonify({"error": "HVR1 sequence is required!"}), 400
        
#         # Validate the sequence length
#         if len(hvr1_sequence) < 10:  # Adjust based on your requirements
#             raise ValueError("Invalid sequence length: The sequence is too short.")
        
#         # Predict geo-location using the HVR1 sequence
#         geo_location, probabilities = predict_geo_location(hvr1_sequence)
        
#         return jsonify({
#             "prediction": geo_location,
#             "probabilities": probabilities,
#             "model_version": "v1.0-geo-location"
#         })
    
#     except ValueError as ve:
#         return jsonify({"error": f"Value Error: {str(ve)}"}), 400
#     except KeyError as ke:
#         return jsonify({"error": f"Key Error: {str(ke)}"}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.geo_predictor import GeoLocationPredictor
from utils.ethnicity_predictor import EthnicityPredictor

app = Flask(__name__)
CORS(app)

geo_predictor = GeoLocationPredictor()
ethnicity_predictor = EthnicityPredictor()

# Geo-location Prediction Endpoint
@app.route('/predict_geo_location', methods=['POST'])
def predict_geo_location():
    data = request.get_json(force=True)
    if 'hvr1_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence in request'}), 400

    sequence = data['hvr1_sequence'].strip()

    try:
        prediction = geo_predictor.predict(sequence)[0]
        probabilities = geo_predictor.predict_proba(sequence)[0]
        return jsonify({'prediction': prediction, 'probabilities': probabilities})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ethnicity Prediction Endpoint
@app.route('/predict_concatenated', methods=['POST'])
def predict_ethnicity():
    data = request.get_json(force=True)

    if 'hvr1_sequence' not in data or 'hvr2_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence or hvr2_sequence'}), 400

    hvr1 = data['hvr1_sequence'].strip()
    hvr2 = data['hvr2_sequence'].strip()
    combined_sequence = hvr1 + hvr2

    try:
        prediction = ethnicity_predictor.predict(combined_sequence)[0]
        probabilities = ethnicity_predictor.predict_proba(combined_sequence)[0]
        return jsonify({'prediction': prediction, 'probabilities': probabilities})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
