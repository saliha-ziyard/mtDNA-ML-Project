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
    <div className="input-sequence-container">
      <h1>mtDNA Ethnicity Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          HVR1 Sequence:
          <textarea
            rows={4} // Set the number of rows
            value={hvr1}
            onChange={(e) => setHvr1(e.target.value)}
          />
        </label>
        <label>
          HVR2 Sequence:
          <textarea
            rows={4} // Set the number of rows
            value={hvr2}
            onChange={(e) => setHvr2(e.target.value)}
          />
        </label>
        <button type="submit">Predict</button>
      </form>
      {ethnicity && <h2>Predicted Ethnicity: {ethnicity}</h2>}
    </div>
  );
};

export default InputSequence;