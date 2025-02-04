import React from 'react';

const HowItWorksCard = ({ title, description, imageUrl }) => {
  return (
    <div className="how-it-works-card">
      <img src={imageUrl} alt={title} className="how-it-works-card-image" />
      <div className="content">
        <h3>{title}</h3>
        <div className='description-box'>
        <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;