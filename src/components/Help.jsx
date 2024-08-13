import React from "react";
import "./Help.css";

function Help() {
  return (
    <div className="help-container">
      <div>
        <h1 className="help-header">Help & Support</h1>
        <nav className="help-nav">
          <ul>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
      </div>

      <div id="faq" className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <article className="faq-item">
          <h3>How do I reset my password?</h3>
          <p>
            To reset your password, go to the login page and click on "Forgot
            Password?" Follow the instructions you receive in your email.
          </p>
        </article>
        <article className="faq-item">
          <h3>How do I contact support?</h3>
          <p>
            If you need further assistance, please reach out to our support team
            at{" "}
            <a href="mailto:RevRescue@gmail.com" className="help-link">
              RevRescue@gmail.com
            </a>{" "}
            or call us at{" "}
            <a href="tel:+1234567890" className="help-link">
              +1234567890
            </a>
            .
          </p>
        </article>
      </div>

      <div id="guides" className="guides-section">
        <ul>
          <li>
            <a href="#">Getting Started Guide</a>
          </li>
          <li>
            <a href="#">Advanced Features</a>
          </li>
          <li>
            <a href="#">Troubleshooting Tips</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
