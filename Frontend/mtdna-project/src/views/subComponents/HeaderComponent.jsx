// HeaderComponent.js
import React from 'react';

function HeaderComponent({ image, text ,subText}) {
  return (
    <div className="header-component">
      <img className="header-image" src={image} alt="Our Team at work" />
      <div className="header-overlay"></div>
      <div className="header-text">
        <h1>{text}</h1>
        <h2>{subText}</h2>
      </div>
    </div>
  );
}

export default HeaderComponent;
