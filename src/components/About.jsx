import React from "react";
import "./About.css";
import HAbout from "./HAbout";

function About() {
  return (
    <div>
      <div className="about-paragraphs">
        <h2 style={{ color: "white" }}>About us</h2>
        <p>
          At RevRescue, our top priority is ensuring that you receive the best
          possible service. Whether you have a question about our services, need
          assistance with a recent request, or just want to give us feedback,
          we're here for you. Our dedicated team of professionals is always
          ready to help you with any inquiries you may have. Don’t hesitate to
          reach out to us—we’re just a message or call away!
        </p>
        <br />
        <p>
          We believe in building strong relationships with our clients. Connect
          with us on social media to stay updated on our latest services, tips
          for maintaining your vehicle, and special offers. Follow us on
          LinkedIn, Facebook, Instagram, and Twitter to join our growing
          community. We love hearing from our customers and engaging with you on
          the platforms you use most.
        </p>
        <br />
        <p>
          If you prefer a face-to-face conversation, we’d be thrilled to welcome
          you to our office in Nairobi. Located at 21 Kimathi Street, our
          headquarters is easily accessible, and our friendly staff will be
          happy to assist you with anything you need. Whether you're dropping by
          to discuss a service request or just to say hello, we look forward to
          meeting you in person.
        </p>
        <br />
        <p>
          For any immediate concerns, feel free to give us a call. Our support
          team is available Monday through Friday from 9:00 AM to 6:00 PM. If
          you prefer to write, send us an email, and we'll get back to you as
          soon as possible. We value your feedback and strive to respond to all
          inquiries promptly. Your satisfaction is our success, and we’re
          committed to providing you with the support you deserve.
        </p>
        <br />
        <p>
          Want to stay informed about the latest updates and promotions from
          RevRescue? Sign up for our mailing list! By joining, you’ll receive
          regular newsletters with tips on vehicle maintenance, special offers,
          and news about our services. Don’t miss out on the opportunity to be
          part of our community and enjoy exclusive benefits.
        </p>
        <br />
      </div>
      <HAbout />
    </div>
  );
}

export default About;
