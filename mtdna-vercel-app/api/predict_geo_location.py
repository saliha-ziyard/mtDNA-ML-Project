import json
from utils.geo_predictor import GeoLocationPredictor

predictor = GeoLocationPredictor()

def handler(event, context):
    try:
        body = json.loads(event['body'])
        sequence = body['hvr1_sequence'].strip()

        prediction = predictor.predict(sequence)[0]
        probabilities = predictor.predict_proba(sequence)[0]

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({
                "prediction": prediction,
                "probabilities": probabilities
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }