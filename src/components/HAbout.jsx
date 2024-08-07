import React from "react";
import "./HAbout.css";
import aboutBanner from "/src/assets/images/about-banner.png";

function HAbout() {
  return (
    <>
      <section className="about">
        <div className="container">
          <figure className="about-banner">
            <img
              src={aboutBanner}
              alt="vehicle repair equipment"
              className="w-100"
            />
          </figure>

          <div className="about-content">
            <h2 className="h2 section-title">
              We’re Committed to Meet the Quality
            </h2>

            <p className="section-text">
              At RevRescue, we're revolutionizing the way you connect with
              skilled mechanics. Our platform ensures that top-notch automotive
              services are just a click away, bringing convenience and
              reliability to your doorstep. Whether it's routine maintenance or
              an unexpected breakdown, our trusted mechanics are ready to rescue
              your ride and get you back on the road with confidence. Experience
              unparalleled service and support with RevRescue – where your car's
              care is our priority.
            </p>

            <ul className="about-list">
              <li className="about-item">
                <p>
                  <strong className="strong">8K+</strong> Happy Clients
                </p>
              </li>

              <li className="about-item">
                <p>
                  <strong className="strong">22+</strong> Instruments
                </p>
              </li>

              <li className="about-item">
                <p>
                  <strong className="strong">50+</strong> Years in Market
                </p>
              </li>

              <li className="about-item">
                <p>
                  <strong className="strong">99%</strong> Projects Completed
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default HAbout;
