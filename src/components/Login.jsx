/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import logo2 from "../assets/logo/browserLogo.png";
import background from "../assets/Landing Page.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [role, setRole] = useState("student");
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, clearAuthError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();

    try {
      const loginData = {
        email,
        password,
        role,
        remember,
      };

      console.log("Login attempt with role:", role);

      await login(loginData);
      console.log("Login successful!");

      // Handle successful login (e.g., redirect)
      // You might want to redirect based on role
      if (role === "teacher") {
        // Redirect to teacher dashboard
        window.location.href = "/teacher-dashboard";
      } else {
        // Redirect to student dashboard
        window.location.href = "/student-dashboard";
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Error is handled by Redux state
    }
  };

  return (
    <div
      className=" bg-cover bg-center bg-no-repeat flex flex-col min-h-screen px-2 font-cairo relative overflow-hidden"
      dir="rtl"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-30 -z-10" />
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-30 -z-10" />

      <div className="w-full max-w-6xl mx-auto flex flex-row-reverse items-center justify-between pt-8 pb-4 px-2 md:px-0">
        <a
          href="/"
          className="text-primary text-base font-medium flex items-center gap-1 hover:underline"
        >
          العودة للرئيسية <span className="mr-1 text-lg">&larr;</span>
        </a>
        <img src={logo2} alt="Harfan Logo" className="w-16 h-16" />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 flex-1 min-h-[calc(100vh-120px)]">
        <div className="flex-1 max-w-md bg-white rounded-2xl shadow-xl p-8 mt-4 mb-8 md:mb-0 md:mt-0 order-2 md:order-none">
          <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
            تسجيل الدخول
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            اختر نوع حسابك للمتابعة -{" "}
            {role === "teacher" ? "تسجيل دخول المعلمين" : "تسجيل دخول الطلاب"}
          </p>
          <div className="flex mb-6 gap-2 rounded-lg relative overflow-hidden p-6">
            <motion.div
              layout
              initial={false}
              animate={{
                x: role === "teacher" ? 0 : "100%",
                width: "50%",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                borderRadius: "0.75rem",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 left-0 h-full z-0"
              style={{ willChange: "transform, width" }}
            />
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 border relative z-10 focus:outline-none
                ${
                  role === "teacher"
                    ? "text-primary border-primary shadow"
                    : "text-gray-400 border-transparent"
                }
                hover:text-primary hover:bg-primary/10 hover:scale-105 active:scale-100`}
              onClick={() => setRole("teacher")}
            >
              <motion.span
                animate={{ scale: role === "teacher" ? 1.08 : 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2"
              >
                <FaChalkboardTeacher /> مدرس
              </motion.span>
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 border relative z-10 focus:outline-none
                ${
                  role === "student"
                    ? "text-primary border-primary shadow"
                    : "text-gray-400 border-transparent"
                }
                hover:text-primary hover:bg-primary/10 hover:scale-105 active:scale-100`}
              onClick={() => setRole("student")}
            >
              <motion.span
                animate={{ scale: role === "student" ? 1.08 : 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2"
              >
                <FaBookOpen /> طالب
              </motion.span>
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                بريد إلكتروني <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  type="email"
                  placeholder="me@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-primary"
                />
                تذكرني
              </label>
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-lg text-lg font-bold mt-2 transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>
        </div>

        <div className="flex-1 flex items-center justify-center md:justify-start bg-transparent order-1 md:order-none">
          <div className="max-w-md text-center md:text-right w-full px-2 md:px-0">
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 flex flex-col sm:flex-row items-center md:items-end justify-center md:justify-end gap-2 md:gap-4">
                <div className="text-[#374151] font-bold">أهلاً بعودتك الى</div>
                <div className="flex flex-col items-center text-primary relative">
                  <svg
                    className="absolute -top-3 md:-top-4 -left-4 md:-left-6 w-6 h-5 md:w-8 md:h-7"
                    width="40"
                    height="34"
                    viewBox="0 0 51 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.8212 21.6974C24.5925 21.506 24.3978 21.363 24.228 21.1953C22.5079 19.507 21.2761 17.5742 20.2323 15.5562C20.1109 15.3194 20.0231 15.0561 20.015 14.8085C20.0102 14.6749 20.1566 14.4873 20.3063 14.4137C20.42 14.3592 20.6791 14.41 20.7888 14.4909C21.0002 14.6423 21.1914 14.8334 21.3354 15.038C22.289 16.3856 23.2338 17.7351 24.1666 19.0909C24.5139 19.5988 24.846 20.1177 25.1813 20.632C25.296 20.8029 25.3987 20.9801 25.487 21.1562C25.5911 21.3529 25.5843 21.568 25.3546 21.6695C25.2025 21.7356 25.0663 21.8223 24.8212 21.6974Z"
                      fill="#333333"
                    />
                    <path
                      d="M37.6756 19.4055C37.4764 19.6037 37.2627 19.8445 37.0219 20.059C36.0685 20.9033 35.1152 21.7475 34.1539 22.5815C33.9445 22.7621 33.6937 22.9153 33.4391 23.0416C33.1004 23.2124 32.8109 23.1835 32.5892 23.0144C32.3676 22.8452 32.3275 22.6 32.5249 22.3072C32.6578 22.1064 32.8115 21.8975 32.9993 21.7371C34.2444 20.6919 35.5007 19.6523 36.7593 18.6201C36.9005 18.5047 37.0783 18.4017 37.2638 18.3526C37.7235 18.2247 38.0944 18.5261 37.9619 18.9207C37.9075 19.0741 37.7845 19.2174 37.6756 19.4055Z"
                      fill="#333333"
                    />
                    <path
                      d="M13.6923 24.7312C13.4434 24.5794 13.2138 24.4 12.9962 24.2142C12.8033 24.0472 12.7319 23.836 12.8546 23.6175C12.9602 23.434 13.304 23.3531 13.6018 23.4674C14.0007 23.6208 14.402 23.7816 14.7656 23.9855C15.8617 24.6003 16.9505 25.2363 18.0306 25.8741C18.3877 26.0873 18.7319 26.3189 19.0696 26.5597C19.1848 26.6434 19.2928 26.7483 19.3512 26.8593C19.5225 27.1651 19.2941 27.4484 18.9072 27.4074C18.6895 27.3838 18.4585 27.3036 18.2691 27.2071C17.6292 26.9122 14.575 25.2622 13.6923 24.7312Z"
                      fill="#333333"
                    />
                  </svg>
                  <span className="font-bold underline decoration-secondary decoration-4 md:decoration-6 underline-offset-3 md:underline-offset-5 relative">
                    حرفان
                  </span>
                </div>
              </h1>
              <p className="text-gray-500 text-base md:text-lg font-medium mb-6 md:mb-8 mt-2 text-center md:text-right">
                استكمل رحلتك التعليمية في تعلم العربية والقرآن الكريم.
              </p>
            </div>
            <ul className="space-y-4 md:space-y-6 mb-8 md:mb-10 w-full">
              <li className="flex items-center justify-start text-gray-700 text-base md:text-xl font-medium">
                <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ml-3">
                  <FaCheckCircle className="text-primary text-lg md:text-2xl" />
                </span>
                <span>دروس تفاعلية مع أفضل المعلمين</span>
              </li>
              <li className="flex items-center justify-start text-gray-700 text-base md:text-xl font-medium">
                <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ml-3">
                  <FaStar className="text-primary text-lg md:text-2xl" />
                </span>
                <span>تتبع تقدمك و احصل على شهادات</span>
              </li>
              <li className="flex items-center justify-start text-gray-700 text-base md:text-xl font-medium">
                <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ml-3">
                  <FaShieldAlt className="text-primary text-lg md:text-2xl" />
                </span>
                <span>بيئة تعليمية آمنة و محمية</span>
              </li>
            </ul>
            <div className="text-base md:text-lg text-gray-700 text-center md:text-right">
              ليس لديك حساب؟
              <a
                href="/signup"
                className="text-primary font-extrabold hover:underline mr-2 md:mr-4"
              >
                إنشاء حساب جديد
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
