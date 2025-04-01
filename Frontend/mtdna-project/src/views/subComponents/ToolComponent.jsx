import React, { useState } from "react";
import axios from "axios";
import { FaSpinner, FaExclamationCircle, FaHistory } from "react-icons/fa";
import { jsPDF } from "jspdf";
import Navigation from "./Navigation";
const ToolComponent = () => {
  const [inputType, setInputType] = useState("combined"); // Track input type
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
    setError(""); // Clear previous errors

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

        // Based on input type, slice HVR1 and HVR2 accordingly
        if (inputType === "hvr1") {
          setHvr1(sequence.slice(hvr1_start - 1, hvr1_end));
        } else if (inputType === "hvr2") {
          setHvr2(sequence.slice(hvr2_start - 1, hvr2_end));
        } else if (inputType === "combined") {
          setHvr1(sequence.slice(hvr1_start - 1, hvr1_end));
          setHvr2(sequence.slice(hvr2_start - 1, hvr2_end));
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    let sequence = "";
    let modelType = "";  // We'll set the model type here
  
    if (inputType === "hvr1") {
      if (!hvr1) {
        setError("Error: HVR1 sequence is required.");
        setLoading(false);
        return;
      }
      sequence = hvr1;
      modelType = "hvr1_ethnicity_model_files"; // The folder name for HVR1 model
    } else if (inputType === "hvr2") {
      if (!hvr2) {
        setError("Error: HVR2 sequence is required.");
        setLoading(false);
        return;
      }
      sequence = hvr2;
      modelType = "hvr2_ethnicity"; // The folder name for HVR2 model
    } else {
      if (!hvr1 || !hvr2) {
        setError("Error: Both HVR1 and HVR2 sequences are required.");
        setLoading(false);
        return;
      }
      sequence = hvr1 + hvr2; // Combine for the backend
      modelType = "combined_ethnicity"; // The folder name for Combined model
    }
  
    try {
      const requestData = { sequence, model_type: modelType }; // Send model_type in the request
      const response = await axios.post("http://127.0.0.1:5000/predict_ml_model_only", requestData);
  
      setEthnicity(response.data.prediction);
      setPredictionHistory([...predictionHistory, response.data.prediction]);
    } catch (error) {
      setError("Error: Unable to process the request. Please try again.");
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // Drawing a border around the page

    // Set the font and color for the logo
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 111, 157); // Blue color for logo
    doc.text("mitoMatch", 20, 20); // Positioning the logo at the top left corner

    // Set font for "Prediction Report"
    let yPosition = 35;
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Prediction Report", 20, yPosition); // Title section

    yPosition += 15;

    // Set font and color for description text
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0); // Black color for description text
    doc.text(
      "Using mitochondrial DNA sequences (HVR1 and HVR2), this tool predicts ethnicity and geolocation of individuals.",
      20,
      yPosition,
      { maxWidth: 170 }
    );

    // HVR1 Section
    if (inputType !== "hvr2") {
      yPosition += 15;
      doc.setFontSize(11);
      doc.setFont("times", "bold");
      doc.text("HVR1 Sequence:", 20, yPosition);
      doc.setFontSize(12);
      doc.setFont("courier", "normal");
      const hvr1Wrapped = doc.splitTextToSize(hvr1, 170);
      yPosition += 10;
      doc.text(hvr1Wrapped, 20, yPosition);
    }

    // HVR2 Section
    if (inputType !== "hvr1") {
      yPosition += 35;
      doc.setFontSize(11);
      doc.setFont("times", "bold");
      doc.text("HVR2 Sequence:", 20, yPosition);
      doc.setFontSize(12);
      doc.setFont("courier", "normal");
      const hvr2Wrapped = doc.splitTextToSize(hvr2, 170);
      yPosition += 10;
      doc.text(hvr2Wrapped, 20, yPosition);
    }

    // Predicted Ethnicity Section
    yPosition += 30;
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("Predicted Ethnicity: ", 20, yPosition); // Text with label on the same line
    const ethnicityXPosition = 80; // Set this as the position where you want to start the ethnicity text
    doc.setFontSize(12);
    doc.setFont("courier", "normal");
    doc.setTextColor(0, 123, 255); // Blue color for ethnicity
    doc.text(ethnicity, ethnicityXPosition, yPosition); // Ethnicity text on the same line

    // Footer Section
    yPosition += 25;
    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.setTextColor(150); // Gray color for footer
    doc.text("Generated by mitoMatch - Powered by jsPDF", 20, yPosition);

    // Save the PDF
    doc.save("Prediction_Report.pdf");
  };

  return (
    <>
      <Navigation />

      <h2 className="tool-description">Select your input type and provide the corresponding sequence(s)</h2>
      <div className="input-type-selection">
            <label>
              <input
                type="radio"
                value="hvr1"
                checked={inputType === "hvr1"}
                onChange={() => setInputType("hvr1")}
              />
              HVR1 Only
            </label>
            <label>
              <input
                type="radio"
                value="hvr2"
                checked={inputType === "hvr2"}
                onChange={() => setInputType("hvr2")}
              />
              HVR2 Only
            </label>
            <label>
              <input
                type="radio"
                value="combined"
                checked={inputType === "combined"}
                onChange={() => setInputType("combined")}
              />
              Combined (HVR1 & HVR2)
            </label>
      </div>
      <div className="tool-container">
        <div className="input-section">
          <button
            className="mode-toggle-button"
            onClick={() => setUseFileUpload(!useFileUpload)}
          >
            {useFileUpload ? "Switch to Manual Input" : "Switch to File Upload"}
          </button>
          
          {useFileUpload ? (
            <div className="file-upload-section">
              <input
                type="file"
                accept=".fasta"
                onChange={handleFileChange}
                className="file-input"
              />
              {file && <p className="file-name">Selected File: {file.name}</p>}
              <button
                onClick={handleSubmit}
                className="predict-button"
                disabled={!file || loading}
              >
                {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="sequence-form">
              {inputType !== "hvr2" && (
                <textarea
                  value={hvr1}
                  onChange={(e) => setHvr1(e.target.value)}
                  placeholder="Enter HVR1 sequence..."
                  className="input-label"
                />
              )}
              {inputType !== "hvr1" && (
                <textarea
                  value={hvr2}
                  onChange={(e) => setHvr2(e.target.value)}
                  placeholder="Enter HVR2 sequence..."
                  className="input-label"
                />
              )}
              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
              </button>
            </form>
          )}
          {error && (
            <p className="error-message">
              <FaExclamationCircle /> {error}
            </p>
          )}
          {ethnicity && (
            <div className="prediction-result">
              <h2>Predicted Ethnicity: {ethnicity}</h2>
              <button onClick={downloadPDF} className="download-button">
                Download Report
              </button>
              <button onClick={resetForm} className="reset-button">
                Reset Form
              </button>
            </div>
          )}
          {predictionHistory.length > 0 && (
            <div className="prediction-history">
              <h3>
                <FaHistory className="history-icon" /> Prediction History
              </h3>
              <ul>
                {predictionHistory.map((prediction, index) => (
                  <li key={index}>{prediction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolComponent;
