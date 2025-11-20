from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.geo_predictor import GeoLocationPredictor
from utils.ethnicity_predictor import EthnicityPredictor
import numpy as np

app = Flask(__name__)
CORS(app)

geo_predictor = GeoLocationPredictor()
ethnicity_predictor = EthnicityPredictor()

@app.route('/predict_geo_location', methods=['POST'])
def predict_geo_location():
    data = request.get_json(force=True)
    if 'hvr1_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence in request'}), 400

    sequence = data['hvr1_sequence'].strip()

    try:
        prediction = geo_predictor.predict(sequence)[0]
        probabilities = geo_predictor.predict_proba(sequence)[0]
        
        # Handle if probabilities is a dict
        if isinstance(probabilities, dict):
            probs_list = probabilities
        elif isinstance(probabilities, np.ndarray):
            probs_list = probabilities.tolist()
        else:
            probs_list = list(probabilities)
            
        return jsonify({
            'prediction': prediction, 
            'probabilities': probs_list
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
        
        # Handle if probabilities is a dict
        if isinstance(probabilities, dict):
            probs_list = probabilities
        elif isinstance(probabilities, np.ndarray):
            probs_list = probabilities.tolist()
        else:
            probs_list = list(probabilities)
            
        return jsonify({
            'prediction': prediction, 
            'probabilities': probs_list
        })
    except Exception as e:
        print(f"Error in predict_ethnicity: {str(e)}")  # Debug logging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)