import React from 'react';
import ProbabilityChart from './ProbabilityChart';
import PDFGenerator from './PDFGenerator';

const ResultDisplay = ({ 
  prediction, 
  probabilities, 
  chartRef, 
  hvr1, 
  hvr2, 
  resetForm, 
  resultType = "Result", 
  reportTitle = "Prediction Report",
  fileName = "Prediction_Report.pdf",
  description = "Using mitochondrial DNA sequences (HVR1 and HVR2), this analysis predicts based on the provided sequence."
}) => {
  return (
    <div className="prediction-result">
      <h2>Predicted {resultType}: {prediction}</h2>
      
      {probabilities && (
        <ProbabilityChart 
          probabilities={probabilities}
          chartRef={chartRef}
        />
      )}
      
      <div className="action-buttons">
        <PDFGenerator 
          chartRef={chartRef}
          hvr1={hvr1}
          hvr2={hvr2}
          prediction={prediction}
          probabilities={probabilities}
          reportTitle={reportTitle}
          fileName={fileName}
          description={description}
        />
        <button onClick={resetForm} className="reset-button">
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;