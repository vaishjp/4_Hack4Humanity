import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CounterSection from "../components/CounterSection";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CounterSection />
    </div>
  );
};

export default Home;
