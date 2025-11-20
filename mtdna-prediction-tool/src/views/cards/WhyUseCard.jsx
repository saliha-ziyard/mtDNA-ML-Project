import React from 'react';

const WhyUseCard = ({ title, description }) => {
  return (
    <div className="why-use-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default WhyUseCard;