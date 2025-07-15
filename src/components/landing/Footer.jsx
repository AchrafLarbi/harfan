import React from "react";
import logo2 from "../../assets/logo/logo2.png";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#181C2A] text-white pt-8 pb-4 mt-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b border-[#23273A] pb-8">
          <div className="flex-1 flex flex-col items-start md:items-end text-right gap-2 order-1 md:order-1">
            <img src={logo2} alt="حرفان" className="w-24 h-24 object-contain mb-2" />
            <p className="text-gray-300 text-sm max-w-xs mb-2">
              حرفان منصة تعليمية تفاعلية تجمع بين تعلم اللغة العربية وحفظ القرآن الكريم. الأنسب لمستوى الطفل ومبتكر.
            </p>
            <div className="flex gap-2 mt-2 justify-end">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#23273A] hover:bg-primary/10 text-white hover:text-primary rounded-lg w-8 h-8 flex items-center justify-center transition" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[#23273A] hover:bg-primary/10 text-white hover:text-primary rounded-lg w-8 h-8 flex items-center justify-center transition" aria-label="LinkedIn">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#23273A] hover:bg-primary/10 text-white hover:text-primary rounded-lg w-8 h-8 flex items-center justify-center transition" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#23273A] hover:bg-primary/10 text-white hover:text-primary rounded-lg w-8 h-8 flex items-center justify-center transition" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center text-center gap-2 order-2 md:order-2 justify-start">
            <h4 className="font-bold text-lg mb-2">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-200">
              <li><a href="#home" className="hover:text-primary transition">الرئيسية</a></li>
              <li><a href="#about" className="hover:text-primary transition">من نحن</a></li>
              <li><a href="#features" className="hover:text-primary transition">المميزات</a></li>
              <li><a href="#plans" className="hover:text-primary transition">الخطط</a></li>
            </ul>
          </div>

          <div className="flex-1 flex flex-col items-start md:items-start text-left gap-2 order-3 md:order-3 justify-start">
            <h4 className="font-bold text-lg mb-2">تواصل معنا</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-center gap-2 justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" /></svg>
                <span>+213 (0)6-62-66-54-22</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M16 12v1a4 4 0 0 1-8 0v-1" /><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>
                <span>info@harfan.dz</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary"><path d="M17.657 16.657L13.414 12.414a2 2 0 0 0-2.828 0l-4.243 4.243" /><circle cx="12" cy="8" r="4" /></svg>
                <span>الجزائر، الجزائر العاصمة</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm mt-6">
          <span>© 2025 حرفان. جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  );
} 