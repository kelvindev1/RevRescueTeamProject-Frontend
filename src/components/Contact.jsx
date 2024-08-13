import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <a href="tel:+1234567890" className="contact-link">
            +1 (234) 567-890
          </a>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href="mailto:contact@example.com" className="contact-link">
            contact@example.com
          </a>
        </div>
        <div className="contact-item">
          <FaLinkedin className="contact-icon" />
          <a
            href="https://www.linkedin.com/in/your-profile"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="contact-item">
          <FaTwitter className="contact-icon" />
          <a
            href="https://twitter.com/yourprofile"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
