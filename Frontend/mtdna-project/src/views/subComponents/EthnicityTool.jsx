// import React, { useState, useRef } from "react";
// import '../../cssStyles/toolComponentCss.scss'
// import axios from "axios";
// import { FaSpinner, FaExclamationCircle, FaHistory } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import html2canvas from 'html2canvas';
// import Navigation from "./Navigation";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const EthnicityTool = () => {
//   const [hvr1, setHvr1] = useState("");
//   const [hvr2, setHvr2] = useState("");
//   const [ethnicity, setEthnicity] = useState("");
//   const [probabilities, setProbabilities] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [useFileUpload, setUseFileUpload] = useState(false);
//   const [file, setFile] = useState(null);
//   const [predictionHistory, setPredictionHistory] = useState([]);
  
//   // Create a ref for the chart container
//   const chartRef = useRef(null);

//   const hvr1_start = 16024, hvr1_end = 16365;
//   const hvr2_start = 73, hvr2_end = 340;

//   // Colors for the pie chart
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

//   const handleFileChange = async (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//     setError(""); // Clear previous errors

//     if (uploadedFile) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target.result;
//         const lines = text.split("\n");
//         let sequence = "";

//         for (let i = 1; i < lines.length; i++) {
//           if (lines[i].startsWith(">")) break;
//           sequence += lines[i].trim();
//         }

//         if (sequence.length < 16400) {
//           setError("Error: Only full mitochondrial genomes are accepted (≥16400 bases).");
//           setFile(null);
//           return;
//         }

//         // Extract both HVR1 and HVR2 for combined analysis only
//         setHvr1(sequence.slice(hvr1_start - 1, hvr1_end));
//         setHvr2(sequence.slice(hvr2_start - 1, hvr2_end));
//       };
//       reader.readAsText(uploadedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
  
//     // Validate that we have both sequences
//     if (!hvr1 || !hvr2) {
//       setError("Error: Both HVR1 and HVR2 sequences are required.");
//       setLoading(false);
//       return;
//     }
    
//     // Always use combined sequences
//     const sequence = hvr1 + hvr2;
//     const modelType = "combined_ethnicity"; 
  
//     try {
//       const requestData = { sequence, model_type: modelType };
//       const response = await axios.post("http://127.0.0.1:5000/predict_ml_model_only", requestData);
  
//       setEthnicity(response.data.prediction);
//       setProbabilities(response.data.probabilities);
//       setPredictionHistory([...predictionHistory, response.data.prediction]);
//     } catch (error) {
//       setError("Error: Unable to process the request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Prepare data for pie chart
//   const preparePieChartData = () => {
//     if (!probabilities) return [];
    
//     return Object.entries(probabilities).map(([name, value]) => ({
//       name,
//       value
//     }));
//   };

//   const resetForm = () => {
//     setHvr1("");
//     setHvr2("");
//     setFile(null);
//     setEthnicity("");
//     setProbabilities(null);
//     setError("");
//   };

//   const downloadPDF = async () => {
//     // Create a new PDF document
//     const doc = new jsPDF();
//     doc.setLineWidth(0.5);
//     doc.rect(10, 10, 190, 277); // Drawing a border around the page
  
//     // Set the font and color for the logo
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(41, 111, 157); // Blue color for logo
//     doc.text("mitoMatch", 20, 20); // Positioning the logo at the top left corner
  
//     // Set font for "Prediction Report"
//     let yPosition = 35;
//     doc.setFontSize(18);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0, 0, 0);
//     doc.text("Ethnicity Prediction Report", 20, yPosition); // Title section with "Ethnicity" added
  
//     yPosition += 15;
  
//     // Set font and color for description text
//     doc.setFontSize(12);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0, 0, 0); // Black color for description text
//     doc.text(
//       "Using mitochondrial DNA sequences (HVR1 and HVR2), this analysis predicts the ethnicity of the individual.",
//       20,
//       yPosition,
//       { maxWidth: 170 }
//     );
  
//     // HVR1 Section
//     yPosition += 15;
//     doc.setFontSize(11);
//     doc.setFont("times", "bold");
//     doc.text("HVR1 Sequence:", 20, yPosition);
//     doc.setFontSize(12);
//     doc.setFont("courier", "normal");
//     const hvr1Wrapped = doc.splitTextToSize(hvr1, 170);
//     yPosition += 10;
//     doc.text(hvr1Wrapped, 20, yPosition);
  
//     // HVR2 Section
//     yPosition += 35;
//     doc.setFontSize(11);
//     doc.setFont("times", "bold");
//     doc.text("HVR2 Sequence:", 20, yPosition);
//     doc.setFontSize(12);
//     doc.setFont("courier", "normal");
//     const hvr2Wrapped = doc.splitTextToSize(hvr2, 170);
//     yPosition += 10;
//     doc.text(hvr2Wrapped, 20, yPosition);
  
//     // Predicted Ethnicity Section
//     yPosition += 30;
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("Predicted Ethnicity: ", 20, yPosition); // Text with label on the same line
//     const ethnicityXPosition = 80; // Set this as the position where you want to start the ethnicity text
//     doc.setFontSize(12);
//     doc.setFont("courier", "normal");
//     doc.setTextColor(0, 123, 255); // Blue color for ethnicity
//     doc.text(ethnicity, ethnicityXPosition, yPosition); // Ethnicity text on the same line
//     doc.setTextColor(0, 0, 0); // Reset color to black
  
//     // Add the pie chart to the PDF using html2canvas
//     if (chartRef.current && probabilities) {
//       try {
//         // Get the size of the original chart container
//         const chartContainer = chartRef.current;
//         const containerWidth = chartContainer.offsetWidth;
//         const containerHeight = chartContainer.offsetHeight;
        
//         // Capture the chart with proper dimensions
//         const canvas = await html2canvas(chartContainer, {
//           width: containerWidth,
//           height: containerHeight,
//           scale: 2, // Higher scale for better quality
//           logging: false,
//           useCORS: true
//         });
        
//         const chartImgData = canvas.toDataURL('image/png');
        
//         // Add the chart image to the PDF
//         yPosition += 20;
//         doc.setFontSize(12);
//         doc.setFont("times", "bold");
//         doc.text("Ethnicity Distribution Chart:", 20, yPosition);
        
//         yPosition += 10;
        
//         // Calculate aspect ratio to prevent stretching
//         const imgWidth = 150; // Max width for the chart in the PDF
//         const aspectRatio = canvas.height / canvas.width;
//         const imgHeight = imgWidth * aspectRatio; // Maintain aspect ratio
        
//         // Center the chart horizontally
//         const leftMargin = (210 - imgWidth) / 2; // 210 is A4 width in mm
        
//         // Add the chart image with proper aspect ratio
//         doc.addImage(chartImgData, 'PNG', leftMargin, yPosition, imgWidth, imgHeight);
        
//         yPosition += imgHeight + 10; // Move position below the chart
//       } catch (error) {
//         console.error("Error capturing chart:", error);
//       }
//     }
  
//     // Probability Details Section
//     if (probabilities) {
//       yPosition += 10;
//       doc.setFontSize(12);
//       doc.setFont("times", "bold");
//     }
  
//     // Footer Section
//     yPosition += 25;
//     doc.setFontSize(10);
//     doc.setFont("times", "italic");
//     doc.setTextColor(150); // Gray color for footer
//     doc.text("Generated by mitoMatch - Powered by jsPDF", 20, yPosition);
  
//     // Save the PDF
//     doc.save("Ethnicity_Prediction_Report.pdf");
//   };

//   return (
//     <>
//       {/* <Navigation /> */}
      
//       <div className="page-header">
//         <h1>mtDNA Ethnicity Prediction Tool</h1>
//         <p>Analyze mitochondrial DNA sequences to predict ethnic origins with our advanced machine learning model</p>
//       </div>

//       <h2 className="tool-description">Upload or enter your combined (HVR1 & HVR2) sequence for ethnicity prediction</h2>
      
//       <div className="tool-container">
//         <div className="input-section">
//           <button
//             className="mode-toggle-button"
//             onClick={() => setUseFileUpload(!useFileUpload)}
//           >
//             {useFileUpload ? "Switch to Manual Input" : "Switch to File Upload"}
//           </button>
          
//           {useFileUpload ? (
//             <div className="file-upload-section">
//               <input
//                 type="file"
//                 accept=".fasta"
//                 onChange={handleFileChange}
//                 className="file-input"
//               />
//               {file && <p className="file-name">Selected File: {file.name}</p>}
//               <button
//                 onClick={handleSubmit}
//                 className="predict-button"
//                 disabled={!file || loading}
//               >
//                 {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="sequence-form">
//               <div className="sequence-input-container">
//                 <label className="sequence-label">HVR1 Sequence:</label>
//                 <textarea
//                   value={hvr1}
//                   onChange={(e) => setHvr1(e.target.value)}
//                   placeholder="Enter HVR1 sequence..."
//                   className="input-label"
//                 />
//               </div>
//               <div className="sequence-input-container">
//                 <label className="sequence-label">HVR2 Sequence:</label>
//                 <textarea
//                   value={hvr2}
//                   onChange={(e) => setHvr2(e.target.value)}
//                   placeholder="Enter HVR2 sequence..."
//                   className="input-label"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="predict-button"
//                 disabled={loading}
//               >
//                 {loading ? <FaSpinner className="spinner" /> : "Predict Ethnicity"}
//               </button>
//             </form>
//           )}
//           {error && (
//             <p className="error-message">
//               <FaExclamationCircle /> {error}
//             </p>
//           )}
//           {ethnicity && (
//             <div className="prediction-result">
//               <h2>Predicted Ethnicity: {ethnicity}</h2>
              
//               {probabilities && (
//                 <div className="probability-chart">
//                   <h3>Ethnicity Probability Distribution</h3>
//                   <div style={{ width: '100%', height: 300 }} ref={chartRef}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie
//                           data={preparePieChartData()}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={true}
//                           label={({ name, value }) => `${name}: ${value}%`}
//                           outerRadius={100}
//                           fill="#8884d8"
//                           dataKey="value"
//                         >
//                           {preparePieChartData().map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip formatter={(value) => `${value}%`} />
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
                  
//                   <div className="probability-text">
//                     <h4>Detailed Probabilities:</h4>
//                     {Object.entries(probabilities).map(([ethnic, prob]) => (
//                       <p key={ethnic}>{ethnic}: {prob}%</p>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               <button onClick={downloadPDF} className="download-button">
//                 Download Report
//               </button>
//               <button onClick={resetForm} className="reset-button">
//                 Reset Form
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EthnicityTool;




import React from "react";
import '../../cssStyles/toolComponentCss.scss';
// import Navigation from "../common/Navigation";
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