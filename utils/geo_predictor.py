import joblib

class GeoLocationPredictor:
    def __init__(self,
                 label_encoder_path='model/hvr1_geo_location_files/label_encoder.joblib',
                 vectorizer_path='model/hvr1_geo_location_files/kmer_vectorizer.joblib',
                 scaler_path='model/hvr1_geo_location_files/scaler_kmer.joblib',
                 classifier_path='model/hvr1_geo_location_files/random_forest_model.joblib'):
        """
        Load the model components.
        """
        self.label_encoder = joblib.load(label_encoder_path)
        self.vectorizer = joblib.load(vectorizer_path)
        self.scaler = joblib.load(scaler_path)
        self.classifier = joblib.load(classifier_path)

    def predict(self, sequences):
        if isinstance(sequences, str):
            sequences = [sequences]
        sequences = [str(seq) for seq in sequences]
        X_kmer = self.vectorizer.transform(sequences)
        X_scaled = self.scaler.transform(X_kmer)
        y_pred_encoded = self.classifier.predict(X_scaled)
        return [self.label_encoder.inverse_transform([pred])[0] for pred in y_pred_encoded]

    def predict_proba(self, sequences):
        if isinstance(sequences, str):
            sequences = [sequences]
        sequences = [str(seq) for seq in sequences]
        X_kmer = self.vectorizer.transform(sequences)
        X_scaled = self.scaler.transform(X_kmer)
        y_pred_proba = self.classifier.predict_proba(X_scaled)
        return [
            dict(zip(self.label_encoder.classes_, proba))
            for proba in y_pred_proba
        ]
