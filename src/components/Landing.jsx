import React from "react";
import Navbar from "./Navbar";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Landing page content goes here */}
        <h1 className="text-3xl font-bold mt-8">مرحباً بكم في حرفان</h1>
        <p className="mt-4 text-lg text-gray-600">هذا هو الصفحة الرئيسية.</p>
      </div>
    </div>
  );
}
