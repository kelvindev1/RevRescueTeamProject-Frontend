import React from "react";
import "./Hservice.css";

function Hservice() {
  return (
    <section
      className="Hsection service has-bg-image"
      aria-labelledby="service-label"
      style={{ backgroundImage: "url('src/assets/images/service-bg.jpg')" }}
    >
      <h2 className="h2 section-title">
        We Provide Great Services For your Vehicle
      </h2>
      <div className="container">
        <ul className="H-service-list">
          <li>
            <div className="H-service-card">
              <figure className="H-card-icon">
                <img
                  src="src/assets/images/services-1.png"
                  alt="Engine Repair"
                />
              </figure>
              <h3 className="h3 card-title">Engine Repair</h3>
              <p className="H-card-text">
                Engine repair is crucial for ensuring your vehicle runs smoothly
                and efficiently. The engine is the heart of your car, and
                various issues like oil leaks, overheating, or unusual noises
                can signal the need for professional attention. Regular
                maintenance, such as oil changes and cooling system checks, can
                help prevent serious engine problems. If you notice a drop in
                performance or the check engine light comes on, it's important
                to have your engine inspected promptly. A skilled technician can
                diagnose the issue and perform necessary repairs to restore your
                engine's performance and reliability.
              </p>
            </div>
          </li>

          <li>
            <div className="H-service-card">
              <figure className="H-card-icon">
                <img
                  src="src/assets/images/services-2.png"
                  alt="Brake Repair"
                />
              </figure>
              <h3 className="h3 card-title">Brake Repair</h3>
              <p className="H-card-text">
                Brake repair is essential for maintaining the safety and
                performance of your vehicle. Over time, brake components can
                wear down due to friction and heat, leading to reduced stopping
                power. Common signs that you may need brake repair include
                squeaking or grinding noises, a spongy brake pedal, or pulling
                to one side when braking. Regular inspections and timely repairs
                not only enhance your safety but can also prolong the life of
                your vehicle. Trust a professional technician to assess your
                brakes and ensure they function optimally, giving you peace of
                mind on the road.
              </p>
            </div>
          </li>

          <li>
            <div className="H-service-card">
              <figure className="H-card-icon">
                <img src="src/assets/images/services-3.png" alt="Tire Repair" />
              </figure>
              <h3 className="h3 card-title">Tire Repair</h3>
              <p className="H-card-text">
                Tire repair is vital for ensuring your vehicle's safety and
                performance on the road. Tires can be damaged by punctures,
                cuts, or sidewall bulges, leading to air loss and potential
                blowouts. Regularly checking your tires for wear and maintaining
                proper inflation can help prevent issues. If you experience a
                flat tire or notice uneven tread wear, timely repair or
                replacement is essential. A professional tire technician can
                assess the damage and determine whether a repair—or a new
                tire—is necessary, helping you to maintain optimal traction and
                safety during your drives.
              </p>
            </div>
          </li>

          <li>
            <div className="H-service-card">
              <figure className="H-card-icon">
                <img
                  src="src/assets/images/services-4.png"
                  alt="Battery Repair"
                />
              </figure>
              <h3 className="h3 card-title">Battery Repair</h3>
              <p className="H-card-text">
                Battery repair is essential for keeping your vehicle reliable
                and functional. A well-functioning battery is crucial for
                starting your engine and powering electronic components. Signs
                that your battery may need repair include dimming headlights,
                difficulty starting the car, or a battery warning light on the
                dashboard. Corrosion on battery terminals or a bloated battery
                case can also indicate problems. Regular maintenance, including
                cleaning terminals and checking connections, can extend battery
                life. If issues arise, visiting a qualified technician for
                diagnosis and repair can prevent breakdowns and ensure your
                vehicle runs smoothly.
              </p>
            </div>
          </li>

          <li className="service-banner">
            <img
              src="src/assets/images/services-5.png"
              alt="Red Car"
              className="move-anims"
            />
          </li>

          <li>
            <div className="H-service-card">
              <figure className="H-card-icon">
                <img
                  src="src/assets/images/services-6.png"
                  alt="Steering Repair"
                />
              </figure>
              <h3 className="h3 card-title">Steering Repair</h3>
              <p className="H-card-text">
                Steering repair is critical for maintaining control and safety
                while driving. If you notice issues such as a stiff or
                unresponsive steering wheel, vibrations when turning, or unusual
                noises, it may be time to have your steering system inspected.
                Problems can stem from various components, including the power
                steering pump, steering rack, or tie rods. Regular maintenance,
                such as fluid checks and alignment services, can help prevent
                steering issues. Consulting a qualified technician at the first
                sign of trouble ensures that your steering remains responsive,
                providing you with confidence and safety on the road.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hservice;
