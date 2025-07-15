import React from "react";
import logo2 from "../../assets/logo/logo2.png";

export default function Footer() {
  return (
    <footer className="bg-[#181C2A] text-white pt-12 pb-4 mt-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 border-b border-[#23273A] pb-8">
          {/* Logo & Description */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <img src={logo2} alt="حرفان" className="w-24 h-24 object-contain mb-2 text-right" />
            <p className="text-gray-300 text-sm max-w-xs">
              حرفان منصة تعليمية تفاعلية تجمع بين تعلم اللغة العربية وحفظ القرآن الكريم. الأنسب لمستوى الطفل ومبتكر.
            </p>
            <div className="flex gap-3 mt-2 justify-center md:justify-end">
              <a href="#" className="hover:text-primary" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary" aria-label="Facebook">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 flex flex-col items-center md:items-center text-center md:text-center gap-4">
            <h4 className="font-bold text-lg mb-2">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-200">
              <li><a href="#home" className="hover:text-primary transition">الرئيسية</a></li>
              <li><a href="#about" className="hover:text-primary transition">من نحن</a></li>
              <li><a href="#features" className="hover:text-primary transition">المميزات</a></li>
              <li><a href="#plans" className="hover:text-primary transition">الخطط</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h4 className="font-bold text-lg mb-2">تواصل معنا</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" /></svg>
                <span>+213 (0)6-62-66-54-22</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M16 12v1a4 4 0 0 1-8 0v-1" /><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>
                <span>info@harfan.dz</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M17.657 16.657L13.414 12.414a2 2 0 0 0-2.828 0l-4.243 4.243" /><circle cx="12" cy="8" r="4" /></svg>
                <span>الجزائر، الجزائر العاصمة</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6">
          <span>© 2025 حرفان. جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  );
} 