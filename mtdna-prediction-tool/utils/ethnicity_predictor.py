import numpy as np
import joblib

class EthnicityPredictor:
    def __init__(self,
                 label_encoder_path='model/combined_ethnicity_model_files/label_encoder.joblib',
                 vectorizer_path='model/combined_ethnicity_model_files/kmer_vectorizer.joblib',
                 scaler_path='model/combined_ethnicity_model_files/scaler_kmer.joblib',
                 classifier_path='model/combined_ethnicity_model_files/gradient_boosting_classifier.joblib'):
        """
        Initialize the predictor by loading saved model components

        Parameters:
        -----------
        label_encoder_path : str
            Path to saved label encoder
        vectorizer_path : str
            Path to saved k-mer vectorizer
        scaler_path : str
            Path to saved feature scaler
        classifier_path : str
            Path to saved gradient boosting classifier
        """
        # Load saved model components
        self.label_encoder = joblib.load(label_encoder_path)
        self.vectorizer = joblib.load(vectorizer_path)
        self.scaler = joblib.load(scaler_path)
        self.classifier = joblib.load(classifier_path)

        # Load class names for reference
        try:
            self.class_names = np.loadtxt('model_files/class_names.txt', dtype=str)
        except:
            self.class_names = self.label_encoder.classes_

    def predict(self, sequences):
        """
        Predict ethnicity for given sequences

        Parameters:
        -----------
        sequences : list or str
            Input sequence(s) to predict

        Returns:
        --------
        list
            Predicted ethnicity labels
        """
        # Ensure sequences is a list
        if isinstance(sequences, str):
            sequences = [sequences]

        # Convert sequences to strings
        sequences = [str(seq) for seq in sequences]

        # Vectorize sequences
        X_kmer = self.vectorizer.transform(sequences)

        # Scale features
        X_scaled = self.scaler.transform(X_kmer)

        # Predict
        y_pred_encoded = self.classifier.predict(X_scaled.toarray())

        # Decode predictions
        return [self.class_names[pred] for pred in y_pred_encoded]

    def predict_proba(self, sequences):
        """
        Predict ethnicity probabilities for given sequences

        Parameters:
        -----------
        sequences : list or str
            Input sequence(s) to predict

        Returns:
        --------
        list of dicts
            Probability predictions for each class
        """
        # Ensure sequences is a list
        if isinstance(sequences, str):
            sequences = [sequences]

        # Convert sequences to strings
        sequences = [str(seq) for seq in sequences]

        # Vectorize sequences
        X_kmer = self.vectorizer.transform(sequences)

        # Scale features
        X_scaled = self.scaler.transform(X_kmer)

        # Predict probabilities
        y_pred_proba = self.classifier.predict_proba(X_scaled.toarray())

        # Convert to list of dicts with class names as keys
        return [
            dict(zip(self.class_names, proba))
            for proba in y_pred_proba
        ]

def predict_ethnicity(hvr1_sequence, hvr2_sequence):
    """
    Predict ethnicity based on HVR1 and HVR2 sequences

    Parameters:
    -----------
    hvr1_sequence : str
        HVR1 DNA sequence
    hvr2_sequence : str
        HVR2 DNA sequence

    Returns:
    --------
    str
        Predicted ethnicity
    """
    # Combine HVR1 and HVR2 sequences
    combined_sequence = hvr1_sequence + hvr2_sequence

    # Initialize predictor
    predictor = EthnicityPredictor()

    # Predict ethnicity
    predictions = predictor.predict(combined_sequence)

    # Return the first (and likely only) prediction
    return predictions[0]

# Example usage
def main():
    # Get input from user
    hvr1_input = input("Enter HVR1 sequence: ")
    hvr2_input = input("Enter HVR2 sequence: ")

    try:
        # Predict ethnicity
        ethnicity = predict_ethnicity(hvr1_input, hvr2_input)
        print(f"Predicted Ethnicity: {ethnicity}")

        # Optional: Get probabilities
        predictor = EthnicityPredictor()
        combined_sequence = hvr1_input + hvr2_input
        probabilities = predictor.predict_proba(combined_sequence)
        print("\nDetailed Probabilities:")
        for ethnicity, probability in probabilities[0].items():
            print(f"{ethnicity}: {probability:.2%}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()