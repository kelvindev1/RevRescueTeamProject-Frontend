import React from "react";
import ContentHeader from "./ContentHeader";
import "./Content.css";
import Card from "./Card";
import MechanicList from "./MechanicList";

function Content() {
  return (
    <div>
      <div className="content">
        <ContentHeader />
        <Card />
        <MechanicList />
      </div>
    </div>
  );
}

export default Content;
