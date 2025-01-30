// src/InputSequence.js
import React, { useState } from 'react';
import axios from 'axios';

const InputSequence = () => {
  const [hvr1, setHvr1] = useState('');
  const [hvr2, setHvr2] = useState('');
  const [ethnicity, setEthnicity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        hvr1,
        hvr2,
      });
      setEthnicity(response.data.ethnicity);
    } catch (error) {
      console.error('Error making API request:', error);
      setEthnicity('Error');
    }
  };

  return (
    <div>
      <h1>mtDNA Ethnicity Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          HVR1 Sequence:
          <input
            type="text"
            value={hvr1}
            onChange={(e) => setHvr1(e.target.value)}
          />
        </label>
        <br />
        <label>
          HVR2 Sequence:
          <input
            type="text"
            value={hvr2}
            onChange={(e) => setHvr2(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {ethnicity && <h2>Predicted Ethnicity: {ethnicity}</h2>}
    </div>
  );
};

export default InputSequence;
