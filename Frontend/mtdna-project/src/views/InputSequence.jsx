import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HeaderComponent from "./subComponents/HeaderComponent";
import bannerImg from "../assets/bannerImg.png";
import { FaRegCircle, FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";
import Navigation from "./subComponents/Navigation";
import '../cssStyles/inputSequenceCss.scss'
const InputSequence = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // navigate("/tool");
    navigate("/tool-selection")
  };

  return (
    <>
      <Navigation />

      <HeaderComponent image={bannerImg} text={"mtDNA Prediction Tools"} />
      <div className="input-sequence">
        <h2>Welcome to the mtDNA Prediction Tool</h2>
        <p>
          Discover your ancestral origins using mitochondrial DNA (mtDNA)
          sequences. Our advanced machine learning model analyzes Hypervariable
          Regions (HVR1 and HVR2) to predict your Ethnicity, Geographic location and provide insights
          into your genetic heritage.
        </p>

        <div className="features-container">
          <div className="features-content">
            <h2 className="features-heading">Why Use Our Tool?</h2>

            <div className="features-grid">
              <div className="feature-card">
                <h3>🔬 Advanced Prediction</h3>
                <p>
                  Predict Ethnicity based on mtDNA sequences with high accuracy.
                </p>
              </div>
              <div className="feature-card">
                <h3>📂 Flexible Input</h3>
                <p>
                  Manually enter sequences or upload a FASTA file for analysis.
                </p>
              </div>
              <div className="feature-card">
                <h3>🌎 Geographic Analysis</h3>
                <p>
                  Predict Geo Location based on mtDNA sequences with high accuracy.
                </p>
              </div>
              <div className="feature-card">
                <h3>💡 User-Friendly</h3>
                <p>
                  Interactive, easy-to-use interface for quick and accurate
                  results.
                </p>
              </div>
            </div>

            <div className="steps-wrapper">
              <div className="step">
                <div className="step-icon">1️⃣</div>
                <p>
                  <span>Choose:</span> Select manual input or upload a FASTA
                  file.
                </p>
              </div>
              <div className="step">
                <div className="step-icon">2️⃣</div>
                <p>
                  <span>Submit:</span> Enter your HVR1 and HVR2 sequences.
                </p>
              </div>
              <div className="step">
                <div className="step-icon">3️⃣</div>
                <p>
                  <span>Get Results:</span> View Ethnicity and Geo Location prediction results.
                </p>
              </div>
            </div>

            <button className="start-button" onClick={handleGetStarted}>
              Get Started <FaArrowRight className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputSequence;
