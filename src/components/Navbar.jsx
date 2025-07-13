"use client";

import { useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { label: "الرئيسية", href: "#home", id: "home" },
    { label: "من نحن", href: "#about", id: "about" },
    { label: "المميزات", href: "#features", id: "features" },
    { label: "الخطط", href: "#plans", id: "plans" },
    { label: "تواصل معنا", href: "#contact", id: "contact" },
    { label: "تسجيل الدخول", href: "/login", id: "login" }, // keep login as a route
  ];

  // Function to detect active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update scroll state for navbar styling
      setIsScrolled(scrollPosition > 10);

      // Update active section
      const sections = navigationItems.filter((item) => item.id !== "login");
      const offsetScrollPosition = scrollPosition + 100; // Add offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (offsetScrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`text-gray-800 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg backdrop-blur-lg bg-white/40"
          : "shadow-none  backdrop-blur-none"
      }`}
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
            <div className="flex items-center justify-between w-full font-bold space-x-6 space-x-reverse">
              {/* Navigation items before logo */}
              {navigationItems.slice(0, 3).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-base font-semibold transition-colors duration-200 hover:text-primary cursor-pointer relative ${
                    activeSection === item.id ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </a>
              ))}

              {/* Logo as navigation item */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/");
                }}
                className="flex-shrink-0 transition-transform duration-200 hover:scale-105 "
              >
                <img src={logo} className="w-16 h-16 object-contain" />
              </a>

              {/* Navigation items after logo */}
              {navigationItems.slice(3).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-base font-semibold transition-colors duration-200 hover:text-primary cursor-pointer relative ${
                    activeSection === item.id ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && item.id !== "login" && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </a>
              ))}
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
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-primary cursor-pointer relative ${
                    activeSection === item.id
                      ? "text-primary bg-secondary underline decoration-primary"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
