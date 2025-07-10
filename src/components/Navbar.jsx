"use client";

import { useState } from "react";
import logo from "../assets/logo/logo.png";

// Simple Menu and X icons as SVG components
const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function ArabicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "من نحن", href: "#about" },
    { label: "المميزات", href: "#features" },
    { label: "الخطط", href: "#plans" },
    { label: "تواصل معنا", href: "#contact" },
    { label: "تسجيل الدخول", href: "/login" }, // keep login as a route
  ];

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="bg-white text-gray-800 border-b border-gray-200 relative"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-300 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:w-full lg:px-8">
            <div className="flex items-center justify-between w-full space-x-6 space-x-reverse">
              {/* All navigation items with logo treated as an item */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/");
                }}
                className={`text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer relative ${
                  navigationItems[0].active ? "text-primary" : "text-primary"
                }`}
              >
                {navigationItems[0].label}
                {navigationItems[0].active && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#about");
                }}
                className="text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer text-gray-700"
              >
                {navigationItems[1].label}
              </a>

              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#features");
                }}
                className="text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer text-gray-700"
              >
                {navigationItems[2].label}
              </a>

              {/* Logo as navigation item */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/");
                }}
                className="flex-shrink-0 transition-transform duration-200 hover:scale-105 "
              >
                <img src={logo} className="w-12 h-12 object-contain" />
              </a>

              <a
                href="#plans"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#plans");
                }}
                className="text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer text-gray-700"
              >
                {navigationItems[3].label}
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer text-gray-700"
              >
                {navigationItems[4].label}
              </a>

              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/login");
                }}
                className="text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer text-gray-700"
              >
                {navigationItems[5].label}
              </a>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex-shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/");
              }}
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105 "
            >
              <img src={logo} className="w-12 h-12 object-contain" />
            </a>
          </div>

          {/* Mobile placeholder for balance */}
          <div className="lg:hidden w-6"></div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border border-gray-200 rounded-lg mt-2 shadow-xl">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer relative ${
                    index === 0 ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {item.label}
                  {index === 0 && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
