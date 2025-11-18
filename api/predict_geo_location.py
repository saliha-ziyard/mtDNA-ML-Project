from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.geo_predictor import GeoLocationPredictor

app = Flask(__name__)
CORS(app)

# Initialize predictor (will be cached)
geo_predictor = None

def get_predictor():
    global geo_predictor
    if geo_predictor is None:
        geo_predictor = GeoLocationPredictor()
    return geo_predictor

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
        return jsonify({'prediction': prediction, 'probabilities': probabilities})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# For Vercel serverless
def handler(request):
    with app.request_context(request.environ):
        return app.full_dispatch_request()