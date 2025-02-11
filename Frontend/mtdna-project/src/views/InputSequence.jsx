import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FaArrowRight } from "react-icons/fa"; 
import HeaderComponent from './subComponents/HeaderComponent';
import bannerImg from '../assets/bannerImg.png'

const InputSequence = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate("/tool"); 
  };

  return (
    <>
    <HeaderComponent image={bannerImg} text={"mtDNA Ethnicity Prediction"} />
    <div className="input-sequence">
      <h2>Welcome to the mtDNA Ethnicity Prediction Tool</h2>
      <p>
        Discover your ancestral origins using mitochondrial DNA (mtDNA) sequences. 
        Our advanced machine learning model analyzes Hypervariable Regions (HVR1 and HVR2) 
        to predict your ethnicity and provide insights into your genetic heritage.
      </p>

      <div className="key-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Predict ethnicity based on mtDNA sequences.</li>
          <li>Supports manual input or FASTA file upload.</li>
          <li>Provides detailed haplogroup information.</li>
          <li>User-friendly and interactive interface.</li>
        </ul>

        <ul>
            <li>
              <strong>Step 1:</strong> Choose between manual input or uploading a FASTA file.
            </li>
            <li>
              <strong>Step 2:</strong> Submit your HVR1 and HVR2 sequences.
              <span className="tooltip">
              </span>
            </li>
            <li>
              <strong>Step 3:</strong> Get an ethnicity prediction with additional haplogroup information.
            </li>
          </ul>
      </div> <br/>
      <button className="start-button" onClick={handleGetStarted}>
        Get Started <FaArrowRight className="arrow-icon" />
      </button>

     
    </div>

    
    </>
  );
};

export default InputSequence;