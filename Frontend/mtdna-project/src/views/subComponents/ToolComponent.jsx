import React, { useState } from "react";
import axios from "axios";
import { FaQuestionCircle, FaHistory, FaSpinner, FaExclamationCircle } from "react-icons/fa";

const ToolComponent = () => {
  const [hvr1, setHvr1] = useState("");
  const [hvr2, setHvr2] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);

  const hvr1_start = 16024, hvr1_end = 16365;
  const hvr2_start = 73, hvr2_end = 340;

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setError("");

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split("\n");
        let sequence = "";

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].startsWith(">")) break; // Stop if another sequence starts
          sequence += lines[i].trim();
        }

        if (sequence.length < 16400) {
          setError("Error: Only full mitochondrial genomes are accepted (≥16400 bases).");
          setFile(null);
          return;
        }

        setHvr1(sequence.slice(hvr1_start - 1, hvr1_end));
        setHvr2(sequence.slice(hvr2_start - 1, hvr2_end));
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const requestData = { hvr1, hvr2 };
      const response = await axios.post("http://127.0.0.1:5000/predict", requestData);
      setEthnicity(response.data.ethnicity);
      setPredictionHistory([...predictionHistory, response.data.ethnicity]);
    } catch (error) {
      setError("Error processing request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHvr1("");
    setHvr2("");
    setFile(null);
    setEthnicity("");
    setError("");
  };

  return (
    <>
      <h2 className="tool-description">Enter your HVR1 and HVR2 sequences or upload a FASTA file.</h2>
      <div className="tool-container">
        <div className="input-section">
          <button className="mode-toggle-button" onClick={() => setUseFileUpload(!useFileUpload)}>
            {useFileUpload ? "Switch to Manual Input" : "Switch to File Upload"}
          </button>

          {useFileUpload ? (
            <div className="file-upload-section">
              <h3> Upload the FASTA below</h3>
              <input type="file" accept=".fasta" onChange={handleFileChange} className="file-input" />
              {file && <p className="file-name">Selected File: {file.name}</p>}

              {/* Show predict button when file is uploaded */}
              <button onClick={handleSubmit} className="predict-button" disabled={!file || loading}>
                {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="sequence-form">
              <div className="input-group">
                <label className="input-label">
                  HVR1 Sequence:
                  <span className="tooltip">
                    <FaQuestionCircle className="tooltip-icon" />
                    <span className="tooltip-text">
                      Enter the nucleotide sequence for Hypervariable Region 1.
                    </span>
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={hvr1}
                  onChange={(e) => setHvr1(e.target.value)}
                  placeholder="Enter HVR1 sequence..."
                  className="sequence-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  HVR2 Sequence:
                  <span className="tooltip">
                    <FaQuestionCircle className="tooltip-icon" />
                    <span className="tooltip-text">
                      Enter the nucleotide sequence for Hypervariable Region 2.
                    </span>
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={hvr2}
                  onChange={(e) => setHvr2(e.target.value)}
                  placeholder="Enter HVR2 sequence..."
                  className="sequence-input"
                />
              </div>

              <button type="submit" className="predict-button" disabled={loading}>
                {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
              </button>
            </form>
          )}

          {error && (
            <div className="error-message">
              <FaExclamationCircle className="error-icon" />
              {error}
            </div>
          )}

          {ethnicity && (
            <div className="prediction-result">
              <h2>Predicted Ethnicity: {ethnicity}</h2>
              <button onClick={resetForm} className="reset-button">
                Reset Form
              </button>
            </div>
          )}
        </div>

        {predictionHistory.length > 0 && (
          <div>
            <h3>Prediction History</h3>
            <ul>
              {predictionHistory.map((prediction, index) => (
                <li key={index}>{prediction}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolComponent;
