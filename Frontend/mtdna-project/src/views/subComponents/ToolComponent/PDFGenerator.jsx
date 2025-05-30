import React from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const PDFGenerator = ({ 
  chartRef, 
  hvr1, 
  hvr2, 
  prediction, 
  probabilities, 
  reportTitle = "Prediction Report", 
  fileName = "Prediction_Report.pdf",
  description = "Using mitochondrial DNA sequences (HVR1 and HVR2), this analysis predicts based on the provided sequence."
}) => {
  
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);
  
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 111, 157);
    doc.text("mitoMatch", 20, 20);
  
    let yPosition = 35;
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(reportTitle, 20, yPosition);
  
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(description, 20, yPosition, { maxWidth: 170 });
  
    yPosition += 15;
    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.text("HVR1 Sequence:", 20, yPosition);
    doc.setFontSize(12);
    doc.setFont("courier", "normal");
    const hvr1Wrapped = doc.splitTextToSize(hvr1, 170);
    yPosition += 10;
    doc.text(hvr1Wrapped, 20, yPosition);
  
    yPosition += hvr1Wrapped.length * 5 + 10;
    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.text("HVR2 Sequence:", 20, yPosition);
    doc.setFontSize(12);
    doc.setFont("courier", "normal");
    const hvr2Wrapped = doc.splitTextToSize(hvr2, 170);
    yPosition += 10;
    doc.text(hvr2Wrapped, 20, yPosition);
  
    yPosition += hvr2Wrapped.length * 5 + 10;
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("Predicted Result: ", 20, yPosition);
    const resultXPosition = 80;
    doc.setFontSize(12);
    doc.setFont("courier", "normal");
    doc.setTextColor(0, 123, 255);
    doc.text(prediction, resultXPosition, yPosition);
    doc.setTextColor(0, 0, 0);
  
    if (chartRef.current && probabilities) {
      try {
        const chartContainer = chartRef.current;
        const canvas = await html2canvas(chartContainer, {
          width: chartContainer.offsetWidth,
          height: chartContainer.offsetHeight,
          scale: window.innerWidth < 768 ? 1.5 : 2, // Adjust scale based on device width
          logging: false,
          useCORS: true
        });
  
        const chartImgData = canvas.toDataURL('image/png');
        yPosition += 20;
        doc.setFontSize(12);
        doc.setFont("times", "bold");
        doc.text("Distribution Chart:", 20, yPosition);
  
        yPosition += 10;
  
        const maxPDFWidth = 210;
        const margin = 30;
        const imgWidth = window.innerWidth < 768 ? 120 : 150;
        const aspectRatio = canvas.height / canvas.width;
        const imgHeight = imgWidth * aspectRatio;
        const leftMargin = (maxPDFWidth - imgWidth) / 2;
  
        doc.addImage(chartImgData, 'PNG', leftMargin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
      } catch (error) {
        console.error("Error capturing chart:", error);
      }
    }
  
    yPosition += 25;
    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.setTextColor(150);
    doc.text("Generated by mitoMatch - Powered by jsPDF", 20, yPosition);
  
    doc.save(fileName);
  };
  

  return (
    <button onClick={downloadPDF} className="download-button">
      Download Report
    </button>
  );
};

export default PDFGenerator;