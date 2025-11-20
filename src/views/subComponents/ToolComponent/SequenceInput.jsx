import React from 'react';

const SequenceInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="sequence-input-container">
      <label className="sequence-label">{label}:</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-label"
      />
    </div>
  );
};

export default SequenceInput;