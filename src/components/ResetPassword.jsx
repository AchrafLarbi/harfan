/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaLock, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import logo2 from "../assets/logo/browserLogo.png";
import background from "../assets/Landing Page.png";
import { motion } from "framer-motion";
import { authAPI } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Get the encoded_pk and token from URL parameters
  const { encoded_pk, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the required parameters
    if (!encoded_pk || !token) {
      setError("رابط إعادة تعيين كلمة المرور غير صالح");
    }
  }, [encoded_pk, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    setIsLoading(true);

    try {
      await authAPI.resetPassword(password, encoded_pk, token);
      setIsSuccess(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="bg-cover bg-center bg-no-repeat flex flex-col min-h-screen px-2 font-cairo relative overflow-hidden"
        dir="rtl"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-row-reverse items-center justify-between pt-8 pb-4 px-2 md:px-0">
          <a
            href="/login"
            className="text-primary text-base font-medium flex items-center gap-1 hover:underline"
          >
            الذهاب لتسجيل الدخول <span className="mr-1 text-lg">&larr;</span>
          </a>
          <img src={logo2} alt="Harfan Logo" className="w-16 h-16" />
        </div>

        <div className="w-full max-w-md mx-auto flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              تم تغيير كلمة المرور!
            </h2>
            <p className="text-gray-600 mb-6">
              تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور
              الجديدة.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              سيتم توجيهك إلى صفحة تسجيل الدخول خلال 3 ثوانِ...
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition"
            >
              <FaArrowLeft />
              تسجيل الدخول الآن
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col min-h-screen px-2 font-cairo relative overflow-hidden"
      dir="rtl"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-row-reverse items-center justify-between pt-8 pb-4 px-2 md:px-0">
        <a
          href="/login"
          className="text-primary text-base font-medium flex items-center gap-1 hover:underline"
        >
          العودة لتسجيل الدخول <span className="mr-1 text-lg">&larr;</span>
        </a>
        <img src={logo2} alt="Harfan Logo" className="w-16 h-16" />
      </div>

      <div className="w-full max-w-md mx-auto flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
            إعادة تعيين كلمة المرور
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            أدخل كلمة المرور الجديدة الخاصة بك
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                كلمة المرور الجديدة <span className="text-red-500">*</span>
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
                  minLength="8"
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                يجب أن تكون كلمة المرور 8 أحرف على الأقل
              </p>
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
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={isLoading || !encoded_pk || !token}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-lg text-lg font-bold transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري التحديث...
                </>
              ) : (
                "تحديث كلمة المرور"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              تذكرت كلمة المرور؟{" "}
              <a
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                تسجيل الدخول
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
