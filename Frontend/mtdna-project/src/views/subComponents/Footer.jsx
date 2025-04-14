import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; 
import '../../cssStyles/FooterCss.scss'
function Footer() {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>mitoMatch</h3>
        <p>
          Unlock the secrets of your mitochondrial DNA with mitoMatch. Fast, accurate, and reliable.
        </p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/input-sequence">Applications</a></li>
          <li><a href="/mitochondrial-dna">mtDNA</a></li>
          <li><a href="/about-us">About Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
          <li><a href="#terms-of-service">Terms of Service</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} mitoMatch. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer