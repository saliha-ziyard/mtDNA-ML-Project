import re

def preprocess_sequence(sequence):
    """Clean and preprocess the sequence by removing invalid characters and converting to uppercase."""
    sequence = re.sub(r'[^ATCGatcg]', '', sequence)  # Remove invalid characters
    return sequence.upper()

def generate_kmers(sequence, k=6):
    """Generate k-mers from the sequence."""
    return [sequence[i:i + k] for i in range(len(sequence) - k + 1)]

def vectorize_sequences(hvr1, hvr2, k=6):
    """
    Vectorize the sequences using the same k-mer-based BoW approach as in training.
    """
    hvr1_kmers = generate_kmers(preprocess_sequence(hvr1), k)
    hvr2_kmers = generate_kmers(preprocess_sequence(hvr2), k)
    combined_kmers = hvr1_kmers + hvr2_kmers
    return vectorizer.transform([' '.join(combined_kmers)]).toarray()
