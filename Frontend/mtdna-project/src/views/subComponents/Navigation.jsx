import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle window resize and update state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navigation-container">
      <h1>mitoMatch</h1>
      
      {/* Hamburger icon for mobile */}
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      {/* Nav links - shown based on screen size or menu state */}
      <div className={`nav-links ${isOpen ? 'show' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/input-sequence" onClick={() => setIsOpen(false)}>Applications</Link>
        <Link to="/mitochondrial-dna" onClick={() => setIsOpen(false)}>Mitochondrial DNA</Link>
        <Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>
        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
      </div>
    </div>
  );
}

export default Navigation;