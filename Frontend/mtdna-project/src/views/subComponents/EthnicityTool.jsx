import React from "react";
import '../../cssStyles/toolComponentCss.scss';
// import Navigation from "../subComponents/Navigation";
import SequenceAnalyzer from "../subComponents/ToolComponent/SequenceAnalyzer";

const EthnicityTool = () => {
  return (
    <>
      {/* <Navigation /> */}
      
      <div className="page-header">
        <h1>mtDNA Ethnicity Prediction Tool</h1>
        <p>Analyze mitochondrial DNA sequences to predict ethnic origins with our advanced machine learning model</p>
      </div>

      <h2 className="tool-description">Upload or enter your combined (HVR1 & HVR2) sequence for ethnicity prediction</h2>
      
      <SequenceAnalyzer 
        modelEndpoint="http://127.0.0.1:5000/predict_concatenated"
        modelType="combined_ethnicity"
        resultType="Ethnicity"
        buttonText="Predict Ethnicity"
        reportTitle="Ethnicity Prediction Report"
        fileName="Ethnicity_Prediction_Report.pdf"
        description="Using mitochondrial DNA sequences (HVR1 and HVR2), this analysis predicts the ethnicity of the individual."
      />
    </>
  );
};

export default EthnicityTool;