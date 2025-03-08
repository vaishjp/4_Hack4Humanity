import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Help Find Missing Children</h1>
      <p>Report anonymously and help reunite families.</p>
      <Link to="/report" className="report-btn">Report Now</Link>
    </section>
  );
};

export default HeroSection;
