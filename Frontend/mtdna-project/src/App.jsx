// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.scss";
import Home from './views/Home';
import InputSequence from './views/InputSequence';
import Navigation from './views/subComponents/Navigation';
// import Applications from './views/Applications';
// import MitochondrialDNA from './views/MitochondrialDNA';
// import AboutUs from './views/AboutUs';
// import Login from './views/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/applications" element={<Applications />} />
          <Route path="/mitochondrial-dna" element={<MitochondrialDNA />} />
          <Route path="/about-us" element={<AboutUs />} /> */}
          <Route path="/input-sequence" element={<InputSequence />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
