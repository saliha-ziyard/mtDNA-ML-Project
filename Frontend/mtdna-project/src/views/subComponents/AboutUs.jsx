import React from 'react';
import bannerImg from "../../assets/bannerImg.png";
import HeaderComponent from "./HeaderComponent";
import Navigation from './Navigation';


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
            Our mission is to advance the understanding of human migration patterns, 
            population genetics, and evolutionary history through comprehensive 
            mitochondrial DNA analysis. By collecting and analyzing mtDNA from diverse 
            populations, we aim to reconstruct maternal lineages and provide insights 
            into our shared genetic heritage.
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="section-content">
          <h2>Our Team</h2>
          <div className="team-cards">
            <div className="team-card">
              <div className="team-photo"></div>
              <h3>Dr. Sarah Johnson</h3>
              <p className="title">Project Director</p>
              <p>
                Specializes in population genetics with over 15 years of experience 
                in mtDNA research. Leads our global sampling initiatives.
              </p>
            </div>

            <div className="team-card">
              <div className="team-photo"></div>
              <h3>Dr. Michael Chen</h3>
              <p className="title">Lead Geneticist</p>
              <p>
                Expert in bioinformatics and mitochondrial genomics. Oversees 
                our laboratory procedures and data analysis protocols.
              </p>
            </div>

            <div className="team-card">
              <div className="team-photo"></div>
              <h3>Dr. Amara Okafor</h3>
              <p className="title">Research Coordinator</p>
              <p>
                Anthropological geneticist focusing on African lineages. Manages 
                our collaborative research partnerships across continents.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="section-content">
          <h2>Our Research</h2>
          <div className="research-cards">
            <div className="research-card">
              <h3>Global mtDNA Database</h3>
              <p>
                Building a comprehensive database of mitochondrial DNA sequences 
                from populations worldwide to track maternal lineages across continents.
              </p>
            </div>

            <div className="research-card">
              <h3>Ancient DNA Analysis</h3>
              <p>
                Extracting and sequencing mtDNA from archaeological remains to understand 
                historical population movements and maternal ancestry.
              </p>
            </div>

            <div className="research-card">
              <h3>Medical Implications</h3>
              <p>
                Investigating the role of mitochondrial variants in health, longevity, 
                and disease susceptibility across different maternal lineages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="section-content centered">
          <h2>Join Our Research</h2>
          <p>
            We're always looking for participants to contribute to our global 
            mtDNA database. By providing a simple cheek swab sample, you can help 
            us map the maternal lineages of humanity.
          </p>
          <button className="join-button">Participate in Our Study</button>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-content">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>contact@mtdnaproject.org</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>Genetics Research Center<br />123 Science Avenue<br />Cambridge, MA 02139</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUs;