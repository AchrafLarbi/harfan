import React from "react";
import Navbar from "./Navbar";
import Home from "../components/landing/Home";
import About from "../components/landing/About";
import Features from "../components/landing/Features";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <Home />
        <About />
        <Features />
      </div>
    </div>
  );
}
