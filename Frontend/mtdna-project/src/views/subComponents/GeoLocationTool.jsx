import React from "react";
import '../../cssStyles/toolComponentCss.scss';
// import Navigation from "../common/Navigation";
import PageHeader from "../subComponents/ToolComponent/PageHeader";
import SequenceAnalyzerGeo from "../subComponents/ToolComponent/geo location/SequenceAnalyzerGeo"
const Geolocation = () => {
  return (
    <>
    
      {/* <Navigation /> */}
      
      <PageHeader 
        title="mtDNA Geo Location Prediction Tool"
        description="Analyze mitochondrial DNA sequences to predict your geographic origins with our advanced machine learning model"
      />

      <h2 className="tool-description">Upload or enter your HVR1 sequence for geo location prediction</h2>
      
      <SequenceAnalyzerGeo 
        modelEndpoint="http://127.0.0.1:5000/predict_geo_location"
        modelType="hvr1_ethnicity"
        resultType="Geo Location"
        buttonText="Predict Geo Location"
        reportTitle="Geo Location Prediction Report"
        fileName="Geo Location_Prediction_Report.pdf"
        description="Using mitochondrial DNA HVR1 sequence, this analysis predicts the geo location of the individual."
      />
    </>
  );
};

export default Geolocation;