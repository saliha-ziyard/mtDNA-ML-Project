from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.geo_predictor import GeoLocationPredictor

app = Flask(__name__)
CORS(app)

geo_predictor = None

def get_predictor():
    global geo_predictor
    if geo_predictor is None:
        geo_predictor = GeoLocationPredictor()
    return geo_predictor

@app.route('/', methods=['POST'])
def predict_geo_location():
    data = request.get_json(force=True)
    if 'hvr1_sequence' not in data:
        return jsonify({'error': 'Missing hvr1_sequence in request'}), 400

    sequence = data['hvr1_sequence'].strip()

    try:
        predictor = get_predictor()
        prediction = predictor.predict(sequence)[0]
        probabilities = predictor.predict_proba(sequence)[0]
        return jsonify({
            'prediction': prediction, 
            'probabilities': probabilities.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Vercel serverless handler
def handler(environ, start_response):
    return app(environ, start_response)