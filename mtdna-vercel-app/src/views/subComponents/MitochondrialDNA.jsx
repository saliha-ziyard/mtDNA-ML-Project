import React, {useState, useEffect} from "react";
import bannerImg from "../../assets/bannerImg.png";
import HeaderComponent from "./HeaderComponent";
import Navigation from "./Navigation";
import mtdnaImg from '../../assets/mtdna.png'
import '../../cssStyles/mtDNACss.scss'

const MitochondrialDNA = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // You could also add system preference detection
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  return (
    <>
    <Navigation />
    <HeaderComponent image={bannerImg} text={"Mitochondrial DNA (mtDNA)"} />

<div className="mtdna-container">
  <div className="mtdna-header">
    <h1 className="mtdna-title">Mitochondrial DNA (mtDNA) is a small, circular DNA found in the
      mitochondria, inherited solely from the mother. Unlike nuclear DNA, it
      has a high mutation rate and plays a crucial role in cellular energy
      production.</h1>
    <div className="mtdna-visual-element"></div>
  </div>

  <div className="mtdna-section">
    <h2 className="mtdna-section-title">Why is mtDNA Important?</h2>
    <ul className="mtdna-list">
      <li className="mtdna-list-item">
        <span className="mtdna-highlight">Maternal Inheritance:</span> 
        mtDNA is passed down from mother to offspring, making it useful for tracing maternal lineage.
      </li>
      <li className="mtdna-list-item">
        <span className="mtdna-highlight">Forensic Science:</span> 
        Used in identifying remains and solving cold cases.
      </li>
      <li className="mtdna-list-item">
        <span className="mtdna-highlight">Medical Research:</span> 
        Helps in studying mitochondrial diseases and genetic disorders.
      </li>
      <li className="mtdna-list-item">
        <span className="mtdna-highlight">Evolutionary Studies:</span> 
        Aids in understanding human migration patterns.
      </li>
    </ul>
  </div>

  <div className="mtdna-section mtdna-structure">
    <h2 className="mtdna-section-title">Structure of mtDNA</h2>
    <div className="mtdna-image-container">
      <img
        src={mtdnaImg}
        alt="Mitochondrial DNA Structure"
        className="mtdna-image"
      />
      {/* <div className="mtdna-image-caption">
        Human mitochondrial genome visualization
      </div> */}
    </div>
    <p>
      The human mitochondrial genome consists of approximately 16,500 base
      pairs, encoding 37 genes essential for mitochondrial function.
    </p>
  </div>

  <div className="mtdna-section">
    <h2 className="mtdna-section-title">Applications of mtDNA Analysis</h2>
    <p>
      Research on mtDNA has wide-ranging applications in fields like genetics,
      anthropology, and medicine. It is often used to study genetic
      predispositions to diseases and human ancestry.
    </p>
    <div className="mtdna-card-container">
      <div className="mtdna-card">
        <div className="mtdna-card-icon genetics"></div>
        <h3>Genetics</h3>
        <p>Identifying inherited conditions and disease markers</p>
      </div>
      <div className="mtdna-card">
        <div className="mtdna-card-icon anthropology"></div>
        <h3>Anthropology</h3>
        <p>Tracing human migration and population history</p>
      </div>
      <div className="mtdna-card">
        <div className="mtdna-card-icon medicine"></div>
        <h3>Medicine</h3>
        <p>Developing treatments for mitochondrial disorders</p>
      </div>
    </div>
  </div>
</div>
</>

  );
};

export default MitochondrialDNA;