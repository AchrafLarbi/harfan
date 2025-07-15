import React from "react";
import Navbar from "./Navbar";
import Home from "../components/landing/Home";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Plans from "../components/landing/Plans";
import Footer from "../components/landing/Footer";
import landingBg from "../assets/Landing Page.png";

export default function Landing() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${landingBg})`,
      }}
    >
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <Home />
        <About />
        <Features />
        <Plans />
      </div>
      <Footer />
    </div>
  );
}
