import React from "react";
import MechanicHomePageNavbar from "./MechanicHomePageNavbar";
import MechanicsSidebar from "./MechanicsSidebar";
import "./MechanicHomepage.css";

function MechanicHomePage() {
  return (
    <>
      <MechanicHomePageNavbar />
      <div className="page-container">
        <MechanicsSidebar />
        <div className="content">
          <h1>Welcome to the Main Content Area</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quod
            iusto laboriosam natus qui ad exercitationem accusantium vero
            perferendis! Incidunt neque minima obcaecati totam debitis animi
            delectus sapiente ab! Esse.
          </p>
          {/* Add more content or components */}
        </div>
      </div>
    </>
  );
}

export default MechanicHomePage;
