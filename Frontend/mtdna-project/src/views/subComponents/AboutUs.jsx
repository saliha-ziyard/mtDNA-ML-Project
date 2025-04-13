import React from 'react';
import bannerImg from "../../assets/bannerImg.png";
import HeaderComponent from "./HeaderComponent";
import Navigation from './Navigation';
import '../../cssStyles/aboutUsCss.scss'

const AboutUs = () => {
  return (
    <>
      <Navigation />

      <HeaderComponent image={bannerImg} text={"About Our mtDNA Project"} />

      <div className="about-us-container">
        <section className="mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is to advance the understanding of human relatedness
              and evolution through mitochondrial DNA analysis. We aim to
              identify the geographic location and ethnicity of individuals using their Mitochondrial DNA Hypervariale region sequences.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="section-content">
            <h2>About The Project</h2>
            <p>
              This research project was established as part of a university degree program
              to explore the potential of mtDNA in tracing human relatedness using the ethnic group and their geographic location. The project uses
              machine learning techniques to analyze mitochondrial DNA samples.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <div className="section-content">
            <h2>Contact Us</h2>
            <p>For more information about this project, please contact:</p>
            <p>Email: ziyard.20210326@iit.ac.lk</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;