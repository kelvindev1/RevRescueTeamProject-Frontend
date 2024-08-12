import React from "react";
import "./Hero.css";

const Hero = () => (
  <>
    <section
      className="hero has-bg-image"
      aria-label="home"
      style={{ backgroundImage: "url('src/assets/images/hero-bg.jpg')" }}
    >
      <div className="container">
        <div className="hero-content">
          <p className="section-subtitle :dark">
            We have talented engineers & mechanics
          </p>
          <h1 className="h1 section-title">
            Auto Maintenance & Repair Service
          </h1>
          <p className="section-text">
            We guarantee our customers fast and efficient car repair and
            maintenance
          </p>

          <a href="/home/services" className="hero-btn">
            <span className="span">Our Services</span>
          </a>
        </div>

        <figure className="hero-banner">
          <img
            src="src/assets/images/hero-banner.png"
            alt="red motor vehicle"
            className="move-anim"
          />
        </figure>
      </div>
    </section>
  </>
);

export default Hero;
