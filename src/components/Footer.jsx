import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="left-section">
          <img
            src="/src/assets/images/footer-shape-1.png"
            alt="car"
            className="car-image"
          />
        </div>

        <div className="right-section">
          <div className="logo">
            <h1>RevRescue</h1>
          </div>
          <div className="description">
            <p>
              Often, things happen due to necessary circumstances or because of
              the pleasures of indulgence, and the resulting problems are not
              always avoided.
            </p>
          </div>
          <div className="social-links">
            {/* we will use aria-label to provide acsessible name for an element
             especially elements with  no visible text such as icons to ensure screen readers
             can convey the purpose of the element to users */}
            {/* rel="noopener" will prevent the new page from having access to window.opener
            this prevents newly opened page to from manipulating original page via javascript  */}
            {/* rel="noreferrer" prevents browser from sening the Referer header to the new page 
            used for privacy to prevents the new page from knowing where the link was clicked from  */}
            <a
              href="https://www.facebook.com/yourprofile"
              aria-label="Facebook"
              className="social-icon bi bi-facebook"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href="https://www.instagram.com/yourprofile"
              aria-label="Instagram"
              className="social-icon bi bi-instagram"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href="https://twitter.com/yourprofile"
              aria-label="Twitter"
              className="social-icon bi bi-twitter"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>

        <div className="opening-hours">
          <h2>Opening Hours</h2>
          <p>
            Monday - Saturday <span>08.00 - 17.30</span>
          </p>
          <p>
            Saturday & Sunday <span>09.30 - 14.00</span>
          </p>
        </div>

        <div className="contact-info">
          <h2>Contact Info</h2>
          <p>
            <a href="tel:+254792182559" className="contact-item">
              <i className="bi bi-telephone-forward-fill"></i> +254 700 000 000
            </a>
          </p>
          <p>
            <a href="mailto:info@reverescue.com" className="contact-item">
              <i className="bi bi-envelope-at-fill"></i> info@RevRescue.com
            </a>
          </p>
          <p>
            <i className="bi bi-geo-alt"></i> 21 Kimathi Street Nairobi, Kenya
          </p>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; 2024, RevRescue. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
