// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InputSequence from './views/InputSequence';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the mtDNA Prediction App!</h1>
        <nav>
          <Link to="/input-sequence">Input Sequence</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/input-sequence" element={<InputSequence />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
