from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.geo_predictor import GeoLocationPredictor

app = Flask(__name__)
CORS(app)

# Initialize predictor once
geo_predictor = None

def get_predictor():
    global geo_predictor
    if geo_predictor is None:
        geo_predictor = GeoLocationPredictor()
    return geo_predictor

@app.route('/', methods=['POST'])
@app.route('/api/predict_geo_location', methods=['POST'])
def predict_geo_location():
    data = request.get_json(force=True)
    if 'hvr1_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence in request'}), 400

    sequence = data['hvr1_sequence'].strip()

    try:
        predictor = get_predictor()
        prediction = predictor.predict(sequence)[0]
        probabilities = predictor.predict_proba(sequence)[0]
        
        # Handle different probability formats
        if hasattr(probabilities, 'tolist'):
            probs_list = probabilities.tolist()
        else:
            probs_list = list(probabilities)
            
        return jsonify({
            'prediction': prediction, 
            'probabilities': probs_list
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Vercel handler
handler = app