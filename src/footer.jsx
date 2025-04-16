import React, { useState } from "react";
import Logo from './logo.png';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import './footer.css';

function Footer() {
  const [isQuickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  const toggleQuickLinks = () => {
    setQuickLinksOpen(prev => !prev);
  };

  const toggleContact = () => {
    setContactOpen(prev => !prev);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        

        <div className="footer-items">
          {/* Quick Links */}
          <div className="footer-logo">
          <img src={Logo} alt="loudbox-logo" />
        </div>

          <div className="footer-links">
            <div className="section-header" onClick={toggleQuickLinks}>
              <h3>Quick Links</h3>
              <span className="toggle-icon">{isQuickLinksOpen ? '−' : '+'}</span>
            </div>
            <ul className={`footer-links-list ${isQuickLinksOpen ? '' : 'hidden'}`}>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/Privacy">Privacy Policy</a></li>
              <li><a href="/about">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <div className="section-header" onClick={toggleContact}>
              <h3>Contact Us</h3>
              <span className="toggle-icon">{isContactOpen ? '−' : '+'}</span>
            </div>
            <div className={`footer-contact-content ${isContactOpen ? '' : 'hidden'}`}>
              <p>Email: support@loudbox.com</p>
              <p>Phone: +234 (903) 495-1446</p>
              <p>Address: 123 Event St, City, Country</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <BsTwitterX />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Loudbox. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;