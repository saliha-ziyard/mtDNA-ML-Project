from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ethnicity_predictor import EthnicityPredictor

app = Flask(__name__)
CORS(app)

# Initialize predictor once
ethnicity_predictor = None

def get_predictor():
    global ethnicity_predictor
    if ethnicity_predictor is None:
        ethnicity_predictor = EthnicityPredictor()
    return ethnicity_predictor

@app.route('/', methods=['POST'])
@app.route('/api/predict_concatenated', methods=['POST'])
def predict_ethnicity():
    data = request.get_json(force=True)

    if 'hvr1_sequence' not in data or 'hvr2_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence or hvr2_sequence'}), 400

    hvr1 = data['hvr1_sequence'].strip()
    hvr2 = data['hvr2_sequence'].strip()
    combined_sequence = hvr1 + hvr2

    try:
        predictor = get_predictor()
        prediction = predictor.predict(combined_sequence)[0]
        probabilities = predictor.predict_proba(combined_sequence)[0]
        
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