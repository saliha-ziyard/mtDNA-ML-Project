from flask import Blueprint, request, jsonify
from utils.preprocessing import preprocess_sequence, vectorize_sequences
import joblib

# Load the ML model, vectorizer, and PCA
rf_model_pca = joblib.load("model/rf_model_pca.pkl")
vectorizer = joblib.load("model/vectorizer.pkl")
pca = joblib.load("model/pca_model.pkl")

# Define a blueprint for the predict API
predict_blueprint = Blueprint("predict", __name__)

@predict_blueprint.route("/predict", methods=["POST"])
def predict_ethnicity():
    try:
        # Get JSON data from the request
        data = request.json
        hvr1 = data.get("hvr1", "")
        hvr2 = data.get("hvr2", "")

        # Preprocess and vectorize the input
        input_vector = vectorize_sequences(hvr1, hvr2)

        # Apply PCA transformation
        input_vector_pca = pca.transform(input_vector)

        # Make predictions
        prediction = rf_model_pca.predict(input_vector_pca)

        # Map prediction to ethnicity labels
        ethnicity_labels = ["Asian", "Caucasian", "African"]
        predicted_ethnicity = ethnicity_labels[prediction[0]]

        return jsonify({"ethnicity": predicted_ethnicity}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
