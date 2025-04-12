import React from 'react';
import { FaSpinner } from "react-icons/fa";
import SequenceInput from './SequenceInput';

const InputForm = ({ hvr1, setHvr1, hvr2, setHvr2, handleSubmit, loading, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="sequence-form">
      <SequenceInput
        label="HVR1 Sequence"
        value={hvr1}
        onChange={(e) => setHvr1(e.target.value)}
        placeholder="Enter HVR1 sequence..."
      />
      <SequenceInput
        label="HVR2 Sequence"
        value={hvr2}
        onChange={(e) => setHvr2(e.target.value)}
        placeholder="Enter HVR2 sequence..."
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