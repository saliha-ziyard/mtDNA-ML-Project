import React from "react";
import bannerImg from "../assets/bannerImg.png";
import dna1 from '../assets/dna-1.png'
import dna2 from '../assets/dna-2.png'
import dna3 from '../assets/dna-3.png'
import HowItWorksCard from "./cards/HowItWorksCard";
import WhyUseCard from "./cards/WhyUseCard";
import Footer from "./subComponents/Footer";
import Navigation from "./subComponents/Navigation";
import '../cssStyles/HomeCss.scss';
import ScrollToTopButton from './subComponents/ScrollToTopButton';

function Home() {
  return (
    <>
    <Navigation />

      <div className="hero-component">
        <img src={bannerImg} />
        <div className="hero-text-container">
          <h1>
            Predict your Genetic Relatedness <br />
            using mitoMatch
          </h1>
          <hr />
          <h2>
            Input your Mitochondrial DNA sequence to identify your ancestry
          </h2>
        </div>
      </div>

      <div className="how-it-works-component">
        <h2>How It Works</h2>
        <div className="how-it-works-cards">
          <HowItWorksCard
            title="Step 1: Provide Your DNA Sequences"
            description="Submit your mtDNA sequences (HVR1, HVR2, or full genome) through our secure web interface."
            imageUrl={dna1}
          />
          <HowItWorksCard
            title="Step 2: Analyze Your Sequences"
            description="Our advanced machine learning model processes your sequences to predict genetic ancestry."
            imageUrl={dna2}
          />
          <HowItWorksCard
            title="Step 3: View Your Results"
            description="Explore detailed reports and visualizations of your genetic ancestry predictions."
            imageUrl={dna3}
          />
        </div>
      </div>

      <div className="why-use-component">
        <div className="content">
          <h2>Why use mitoMatch?</h2>
          <p className="subtitle">
            With mitoMatch you can uncover the secrets hidden in your mitochondrial
            DNA
          </p>
          <div className="features">
            <WhyUseCard
              title="Precision and Clarity"
              description="From Ethnicity predictions to Geo Location tracing, we help you map your genetic story with precision and clarity."
            />
            <WhyUseCard
              title="Cutting-Edge Technology"
              description="We use cutting-edge machine learning techniques to analyze your mtDNA with speed and accuracy. Every prediction is backed by science, giving you results you can trust."
            />
            <WhyUseCard
              title="For Everyone"
              description="Whether you're a population genetics researcher or simply curious about your roots, mitoMatch is designed for all skill levels—easy enough for beginners, robust enough for experts."
            />
            <WhyUseCard
              title="Fast and Reliable"
              description="Upload your sequences, run the analysis, and get results in minutes. No complex steps or waiting periods—just fast and reliable insights."
            />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default Home;
