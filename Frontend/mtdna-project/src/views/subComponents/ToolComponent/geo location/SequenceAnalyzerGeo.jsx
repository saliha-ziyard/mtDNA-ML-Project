import React, { useState, useRef } from "react";
import axios from "axios";
import FileUpload from '../FileUpload';
import InputForm from './InputForm';
import ErrorDisplay from '../ErrorDisplay';
import ResultDisplay from '../ResultDisplay';

const SequenceAnalyzerGeo = ({
  modelEndpoint = "http://127.0.0.1:5000/predict_geo_location",
  modelType = "hvr1_ethnicity",
  resultType = "Ethnicity",
  buttonText = "Predict",
  reportTitle = "Prediction Report",
  fileName = "Prediction_Report.pdf",
  description = "Using mitochondrial DNA HVR1 sequence, this analysis predicts based on the provided sequence."
}) => {
  const [hvr1, setHvr1] = useState("");
  const [prediction, setPrediction] = useState("");
  const [probabilities, setProbabilities] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);

  const chartRef = useRef(null);

  const hvr1_start = 16024, hvr1_end = 16365;

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
          if (lines[i].startsWith(">")) break;
          sequence += lines[i].trim();
        }

        if (sequence.length < 16400) {
          setError("Error: Only full mitochondrial genomes are accepted (≥16400 bases).");
          setFile(null);
          return;
        }

        // Extract only HVR1
        setHvr1(sequence.slice(hvr1_start - 1, hvr1_end));
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!hvr1) {
      setError("Error: HVR1 sequence is required.");
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        hvr1_sequence: hvr1,
        model_type: modelType
      };

      const response = await axios.post(modelEndpoint, requestData);

      setPrediction(response.data.prediction);
      setProbabilities(response.data.probabilities);
      setPredictionHistory([...predictionHistory, response.data.prediction]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError(`Error: ${error.response?.data?.error || "Unable to process the request. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHvr1("");
    setFile(null);
    setPrediction("");
    setProbabilities(null);
    setError("");
  };

  return (
    <div className="tool-container">
      <div className="input-section">
        <button
          className="mode-toggle-button"
          onClick={() => setUseFileUpload(!useFileUpload)}
        >
          {useFileUpload ? "Switch to Manual Input" : "Switch to File Upload"}
        </button>

        {useFileUpload ? (
          <FileUpload
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            file={file}
            loading={loading}
          />
        ) : (
          <InputForm
            hvr1={hvr1}
            setHvr1={setHvr1}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonText={`Predict ${resultType}`}
          />
        )}

        <ErrorDisplay error={error} />

        {prediction && (
          <ResultDisplay
            prediction={prediction}
            probabilities={probabilities}
            chartRef={chartRef}
            hvr1={hvr1}
            hvr2={null}
            resetForm={resetForm}
            resultType={resultType}
            reportTitle={reportTitle}
            fileName={fileName}
            description={description}
          />
        )}
      </div>
    </div>
  );
};

export default SequenceAnalyzerGeo;
