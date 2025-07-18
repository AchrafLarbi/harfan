/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import background from "../assets/LandingPage.png";
import logo2 from "../assets/logo/browserLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    country: "",
    date_of_birth: "",
    specialty: "",
    years_of_experience: "",
    cv: null,
    profile_picture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { signup, isLoading, error, clearAuthError } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();

    if (formData.password !== formData.confirmPassword) {
      alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }

    if (!agreed) {
      alert("يجب الموافقة على الشروط والأحكام");
      return;
    }

    try {
      // Create FormData for file uploads
      const submitData = new FormData();

      // Convert date format from yyyy-mm-dd to dd/mm/yyyy
      const convertDateFormat = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
      };

      // Add all text fields
      submitData.append("first_name", formData.first_name);
      submitData.append("last_name", formData.last_name);
      submitData.append("email", formData.email);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("password", formData.password);
      submitData.append("password2", formData.password); // Backend expects password2
      submitData.append("role", role);
      submitData.append("country", formData.country);
      submitData.append(
        "date_of_birth",
        convertDateFormat(formData.date_of_birth)
      );

      // Add teacher-specific fields if teacher
      if (role === "teacher") {
        submitData.append("specialty", formData.specialty);
        submitData.append("years_of_experience", formData.years_of_experience);

        // Add CV file if selected
        if (formData.cv) {
          submitData.append("cv", formData.cv);
        }
      }

      // Add profile picture if selected
      if (formData.profile_picture) {
        submitData.append("profile_picture", formData.profile_picture);
      }

      await signup(submitData);
      console.log("Signup successful!");
      setShowSuccessPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col px-2 font-cairo relative overflow-hidden"
      dir="rtl"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md"
          >
            <FaCheckCircle className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">تم إنشاء الحساب بنجاح!</h3>
              <p className="text-sm opacity-90">مرحباً بك في عائلة حرفان</p>
            </div>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="ml-auto text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Header Content */}
      <div className="w-full max-w-4xl mx-auto text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex flex-wrap items-baseline justify-center gap-2 md:gap-4">
          <div className="text-[#374151] font-bold">انضم إلى عائلة</div>
          <div className="flex items-baseline text-primary relative">
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
        <p className="text-gray-500 text-lg md:text-xl font-medium text-center">
          ابدأ رحلتك التعليمية في تعلم العربية والقرآن الكريم مع أفضل المعلمين
        </p>
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex items-center justify-center pb-8">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
            إنشاء حساب جديد
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            اختر نوع حسابك للمتابعة
          </p>
          <div className="flex mx-auto max-w-xl  mb-6 gap-2 rounded-lg relative overflow-hidden p-6">
            {/* Animated sliding indicator */}
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
            <AnimatePresence mode="wait">
              {role === "teacher" && (
                <motion.div
                  key="teacher"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{
                    duration: 0.22,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  className="space-y-4"
                >
                  <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-lg p-4 mb-2 bg-primary/5">
                    <label className="flex flex-col items-center cursor-pointer w-full">
                      <span className="text-primary font-bold mb-2 flex items-center gap-2">
                        <svg
                          width="32"
                          height="32"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path fill="#6366f1" d="M12 16V4m0 0l-4 4m4-4l4 4" />
                          <path
                            stroke="#6366f1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16V4m0 0l-4 4m4-4l4 4"
                          />
                          <path
                            stroke="#6366f1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5"
                          />
                        </svg>
                        {formData.cv
                          ? formData.cv.name
                          : "اسحب وأفلت سيرتك الذاتية أو اختر ملفك"}
                      </span>
                      <input
                        type="file"
                        name="cv"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      سنوات الخبرة <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                      type="number"
                      name="years_of_experience"
                      min="0"
                      placeholder="مثال: 5"
                      value={formData.years_of_experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      المجال <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                      type="text"
                      name="specialty"
                      placeholder="مثال: اللغة العربية، القرآن الكريم"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </motion.div>
              )}
              {role === "student" && (
                <motion.div
                  key="student"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{
                    duration: 0.22,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                ></motion.div>
              )}
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  الاسم الأول <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                    type="text"
                    name="first_name"
                    placeholder="أحمد"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  اسم العائلة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                    type="text"
                    name="last_name"
                    placeholder="محمد"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Profile Picture Upload - for both students and teachers */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                صورة الملف الشخصي (اختياري)
              </label>
              <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <label className="flex flex-col items-center cursor-pointer w-full">
                  <span className="text-gray-600 font-medium mb-2 flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formData.profile_picture
                      ? formData.profile_picture.name
                      : "اختر صورة الملف الشخصي"}
                  </span>
                  <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </span>
                </label>
              </div>
            </div>
            {/* Student-only phone number field */}
            {(role === "student" || role === "teacher") && (
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                    type="tel"
                    name="phone_number"
                    placeholder="+213 ..."
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
                  name="email"
                  placeholder="me@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  تاريخ الميلاد <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  البلد
                </label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">اختر البلد</option>
                  <option value="egypt">مصر</option>
                  <option value="saudi">السعودية</option>
                  <option value="uae">الإمارات</option>
                  <option value="qatar">قطر</option>
                  <option value="kuwait">الكويت</option>
                  <option value="bahrain">البحرين</option>
                  <option value="oman">عمان</option>
                  <option value="jordan">الأردن</option>
                  <option value="lebanon">لبنان</option>
                  <option value="syria">سوريا</option>
                  <option value="iraq">العراق</option>
                  <option value="palestine">فلسطين</option>
                  <option value="yemen">اليمن</option>
                  <option value="algeria">الجزائر</option>
                  <option value="morocco">المغرب</option>
                  <option value="tunisia">تونس</option>
                  <option value="libya">ليبيا</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
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
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  تأكيد كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="accent-primary mt-0.5"
                required
              />
              <label className="text-gray-700 leading-relaxed">
                أوافق على{" "}
                <a href="#" className="text-primary hover:underline">
                  شروط الاستخدام
                </a>{" "}
                و{" "}
                <a href="#" className="text-primary hover:underline">
                  سياسة الخصوصية
                </a>{" "}
                الخاصة بمنصة حرفان
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-lg text-lg font-bold mt-2 transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري إنشاء الحساب...
                </>
              ) : (
                "الانضمام لعائلة حرفان"
              )}
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-700">
            لديك حساب بالفعل؟{" "}
            <a
              href="/login"
              className="text-primary font-extrabold hover:underline"
            >
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
