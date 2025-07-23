"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo/logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigationItems = [
  { label: "الرئيسية", href: "#home", id: "home" },
  { label: "من نحن", href: "#about", id: "about" },
  { label: "المميزات", href: "#features", id: "features" },
  { label: "الخطط", href: "#plans", id: "plans" },
  { label: "تواصل معنا", href: "#contact", id: "contact" },
  { label: "تسجيل الدخول", href: "/login", id: "login" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Get auth state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin =
    isAuthenticated && user && (user.is_staff || user.is_superuser);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      const sections = navigationItems.filter((item) => item.id !== "login");
      const offsetScrollPosition = scrollPosition + 100;
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
    handleScroll();
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
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3D4D9C] hover:bg-[#3D4D9C]/10 focus:bg-[#3D4D9C]/20 p-2 rounded-full focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-between lg:w-full lg:px-8">
            <div className="flex items-center justify-between w-full font-bold space-x-6 space-x-reverse">
              {navigationItems.slice(0, 3).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-base font-semibold transition-colors duration-200 hover:text-[#3D4D9C] focus:text-[#3D4D9C] focus:bg-[#3D4D9C]/10 hover:bg-[#3D4D9C]/10 rounded-xl cursor-pointer relative ${
                    activeSection === item.id
                      ? "text-[#3D4D9C]"
                      : "text-gray-700"
                  }`}
                  tabIndex={0}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3D4D9C]"></div>
                  )}
                </a>
              ))}

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

              {navigationItems.slice(3).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-base font-semibold transition-colors duration-200 hover:text-[#3D4D9C] focus:text-[#3D4D9C] focus:bg-[#3D4D9C]/10 hover:bg-[#3D4D9C]/10 rounded-xl cursor-pointer relative ${
                    activeSection === item.id
                      ? "text-[#3D4D9C]"
                      : "text-gray-700"
                  }`}
                  tabIndex={0}
                >
                  {item.label}
                  {activeSection === item.id && item.id !== "login" && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3D4D9C]"></div>
                  )}
                </a>
              ))}

              {/* Admin Content Management Link - Only show for admin users */}
              {isAdmin && (
                <a
                  href="/admin/content"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("/admin/content");
                  }}
                  className="text-base font-semibold transition-colors duration-200 focus:bg-[#3D4D9C]/10 rounded-xl cursor-pointer relative text-amber-600 hover:text-amber-700"
                  tabIndex={0}
                  title="إدارة المحتوى"
                >
                  <svg
                    className="w-5 h-5 inline-block ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  إدارة المحتوى
                </a>
              )}
            </div>
          </div>

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

          <div className="lg:hidden w-6"></div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border border-gray-200 rounded-2xl mx-2 mt-2 px-4 py-4 shadow-xl animate-fade-in">
            <nav className="mb-2">
              <ul className="space-y-3 text-gray-700 font-medium">
                {navigationItems.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={
                        idx === 0
                          ? "block text-[#3D4D9C] font-semibold"
                          : "block hover:text-[#3D4D9C] focus:text-[#3D4D9C] focus:bg-[#3D4D9C]/10 hover:bg-[#3D4D9C]/10 rounded-xl transition px-3 py-2 cursor-pointer"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      tabIndex={0}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                {/* Admin Content Management Link for Mobile - Only show for admin users */}
                {isAdmin && (
                  <li>
                    <a
                      href="/admin/content"
                      className="block text-amber-600 hover:text-amber-700 focus:text-amber-700 focus:bg-amber-100 hover:bg-amber-100 rounded-xl transition px-3 py-2 cursor-pointer font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                      tabIndex={0}
                    >
                      <svg
                        className="w-4 h-4 inline-block ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      إدارة المحتوى
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
