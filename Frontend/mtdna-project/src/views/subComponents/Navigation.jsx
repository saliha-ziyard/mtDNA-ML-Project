import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation-container"> 
    <h1>mitoMatch</h1>
     <div className='nav-links'>
     <Link to="/">Home</Link>
      <Link to="/input-sequence">Applications</Link>
      <Link to="/mitochondrial-dna">Mitochondrial DNA</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/login">Login</Link>
     </div>
    </div>
  );
}

export default Navigation;
