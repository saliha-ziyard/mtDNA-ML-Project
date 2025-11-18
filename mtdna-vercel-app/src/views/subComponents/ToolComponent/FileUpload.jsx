import React from 'react';
import { FaSpinner } from "react-icons/fa";

const FileUpload = ({ handleFileChange, handleSubmit, file, loading }) => {
  return (
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
        {loading ? <FaSpinner className="spinner" /> : "Predict"}
      </button>
    </div>
  );
};

export default FileUpload;