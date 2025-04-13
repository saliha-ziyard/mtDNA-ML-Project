import React from 'react';
import { FaSpinner } from "react-icons/fa";
import SequenceInput from '../SequenceInput';

const InputForm = ({ hvr1, setHvr1, handleSubmit, loading, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="sequence-form">
      <SequenceInput
        label="HVR1 Sequence"
        value={hvr1}
        onChange={(e) => setHvr1(e.target.value)}
        placeholder="Enter HVR1 sequence..."
      />
      
      <button
        type="submit"
        className="predict-button"
        disabled={loading}
      >
        {loading ? <FaSpinner className="spinner" /> : buttonText || "Predict"}
      </button>
    </form>
  );
};

export default InputForm;