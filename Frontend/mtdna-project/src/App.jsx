// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.scss";
import Home from './views/Home';
import InputSequence from './views/InputSequence';
import Navigation from './views/subComponents/Navigation';
// import ToolComponent from "./views/subComponents/ToolComponent";
import Footer from './views/subComponents/Footer';
import MitochondrialDNA from './views/subComponents/MitochondrialDNA';
// import Applications from './views/Applications';
import AboutUs from './views/subComponents/AboutUs';
import Login from './views/subComponents/Login';
import ToolSelection from './views/subComponents/ToolSelection';
import EthnicityTool from './views/subComponents/EthnicityTool';
import GeolocationTool from './views/subComponents/GeoLocationTool';
const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/applications" element={<Applications />} /> */}
          <Route path="/mitochondrial-dna" element={<MitochondrialDNA />} />
          <Route path="/about-us" element={<AboutUs />} /> 
          <Route path="/input-sequence" element={<InputSequence />} />
          <Route path='/tool-selection' element={<ToolSelection/>} />
          <Route path='/ethnicity-tool' element={<EthnicityTool />} />
          <Route path='/geo-location-tool' element={<GeolocationTool />}/>
          {/* <Route path="/tool" element={<ToolComponent />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
