import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard--content">
          <Content />
          <Profile />
        </div>
      </div>
    </>
  );
}

export default Home;