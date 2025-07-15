import React, { useState } from "react";
import { FaChalkboardTeacher, FaBookOpen, FaCheckCircle, FaStar, FaShieldAlt } from "react-icons/fa";
import logo2 from "../assets/logo/browserLogo.png"; // Make sure the path to your logo is correct

export default function Login() {
  const [role, setRole] = useState("student");
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7fb] px-2 font-cairo relative" dir="rtl">
      
      {/* Decorative Circles */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100 rounded-full opacity-30 -z-10" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full opacity-30 -z-10" />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent rounded-2xl shadow-none md:shadow-lg overflow-hidden">

        {/* Left: Login Card */}
        <div className="flex-1 bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-md">
          <div className="w-full max-w-xs">
            <a href="/" className="text-blue-700 text-sm font-medium flex items-center mb-6">
              <span className="ml-2">&larr;</span> العودة للرئيسية
            </a>
            <h2 className="text-[22px] font-bold mb-1 text-center text-gray-800">تسجيل الدخول</h2>
            <p className="text-gray-500 text-sm text-center mb-6">اختر نوع حسابك للمتابعة</p>

            <div className="flex mb-6 gap-2 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  role === "teacher"
                    ? "bg-white text-blue-700 shadow border border-blue-700"
                    : "text-gray-500"
                }`}
                onClick={() => setRole("teacher")}
              >
                <FaChalkboardTeacher /> مدرس
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  role === "student"
                    ? "bg-white text-blue-700 shadow border border-blue-700"
                    : "text-gray-500"
                }`}
                onClick={() => setRole("student")}
              >
                <FaBookOpen /> طالب
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  بريد إلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  type="email"
                  placeholder="me@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  كلمة المرور <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm mb-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="accent-blue-700"
                  />
                  تذكرني
                </label>
                <a href="#" className="text-blue-700 hover:underline">نسيت كلمة المرور؟</a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-lg font-bold mt-2 transition"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>

        {/* Right: Welcome Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 bg-transparent md:bg-[#f7f7fb]">
          <div className="max-w-md text-center md:text-right">
            <img src={logo2} alt="Harfan Logo" className="mx-auto md:mx-0 mb-6 w-16 h-16" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-snug">
              أهلاً بعودتك<br />الى منصة <span className="text-blue-700">حرفان</span>
            </h1>
            <p className="text-gray-500 mb-6">استكمل رحلتك التعليمية في تعلم العربية والقرآن الكريم.</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700 text-lg">
                <FaCheckCircle className="text-blue-700" /> دروس تفاعلية مع أفضل المعلمين
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-lg">
                <FaStar className="text-blue-700" /> تتبع تقدمك و احصل على شهادات
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-lg">
                <FaShieldAlt className="text-blue-700" /> بيئة تعليمية آمنة و محمية
              </li>
            </ul>

            <div className="text-gray-700 text-lg">
              ليس لديك حساب؟
              <a href="/signup" className="text-blue-700 font-bold ml-2 hover:underline">إنشاء حساب جديد</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
