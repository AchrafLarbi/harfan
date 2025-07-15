"use client";

import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo/logo.png';
import { useState } from 'react';

const navigationItems = [
  { label: 'الرئيسية', href: '#home', id: 'home' },
  { label: 'من نحن', href: '#about', id: 'about' },
  { label: 'المميزات', href: '#features', id: 'features' },
  { label: 'الخطط', href: '#plans', id: 'plans' },
  { label: 'تواصل معنا', href: '#contact', id: 'contact' },
  { label: 'تسجيل الدخول', href: '/login', id: 'login' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 font-sans" dir="rtl">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100 flex-row-reverse">
        {/* Menu button on the right for RTL */}
        <button
          className="lg:hidden p-2 focus:outline-none rounded-full hover:bg-[#3D4D9C]/10 focus:bg-[#3D4D9C]/20 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-[#3D4D9C]" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-[#3D4D9C]" />
          )}
        </button>
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-8 space-x-reverse text-gray-700 font-medium">
            {navigationItems.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={
                    idx === 0
                      ? 'text-[#3D4D9C] font-semibold'
                      : 'hover:text-[#3D4D9C] focus:text-[#3D4D9C] focus:bg-[#3D4D9C]/10 hover:bg-[#3D4D9C]/10 rounded-xl transition px-3 py-2 cursor-pointer'
                  }
                  tabIndex={0}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border border-gray-200 rounded-2xl mx-2 mt-2 px-4 py-4 shadow-xl animate-fade-in">
          <nav className="mb-2">
            <ul className="space-y-3 text-gray-700 font-medium">
              {navigationItems.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={
                      idx === 0
                        ? 'block text-[#3D4D9C] font-semibold'
                        : 'block hover:text-[#3D4D9C] focus:text-[#3D4D9C] focus:bg-[#3D4D9C]/10 hover:bg-[#3D4D9C]/10 rounded-xl transition px-3 py-2 cursor-pointer'
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                    tabIndex={0}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
