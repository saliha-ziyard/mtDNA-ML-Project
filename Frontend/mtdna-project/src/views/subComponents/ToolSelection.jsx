import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUserFriends, FaArrowRight } from "react-icons/fa";
import Navigation from "./Navigation";
import '../../cssStyles/toolSelectionCss.scss';

const ToolSelection = () => {
  const navigate = useNavigate();

  const handleSelectEthnicity = () => {
    navigate("/ethnicity-tool");
  };

  const handleSelectGeolocation = () => {
    navigate("/geolocation-tool");
  };

  return (
    <>
      {/* <Navigation /> */}
      <div className="tool-selection-container">
        <h1 className="selection-title">Select a Prediction Tool</h1>
        <p className="selection-description">
          Choose one of our specialized mtDNA analysis tools to discover more about your genetic heritage.
        </p>

        <div className="tools-grid">
          <div className="tool-card" onClick={handleSelectEthnicity}>
            <div className="tool-icon">
              <FaUserFriends size={48} />
            </div>
            <h2>Ethnicity Prediction</h2>
            <p>
              Predict your ethnic origins based on HVR1 and HVR2 sequences using 
              our advanced machine learning model.
            </p>
            <div className="tool-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>High accuracy prediction</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Detailed probability distribution</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Exportable PDF reports</span>
              </div>
            </div>
            <button className="select-tool-btn">
              Select This Tool <FaArrowRight />
            </button>
          </div>

          <div className="tool-card" onClick={handleSelectGeolocation}>
            <div className="tool-icon">
              <FaMapMarkerAlt size={48} />
            </div>
            <h2>Geolocation Prediction</h2>
            <p>
              Discover the geographical origins of your maternal lineage with 
              our location prediction model.
            </p>
            <div className="tool-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Geolocation mapping</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Interactive geographical visualization</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Exportable PDF reports</span>
              </div>
            </div>
            <button className="select-tool-btn">
              Select This Tool <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolSelection;