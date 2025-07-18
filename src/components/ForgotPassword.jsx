/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import logo2 from "../assets/logo/browserLogo.png";
import background from "../assets/Landing Page.png";
import { motion } from "framer-motion";
import { authAPI } from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authAPI.requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err) {
      setError(
        err.message || "حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور"
      );
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
            العودة لتسجيل الدخول <span className="mr-1 text-lg">&larr;</span>
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
              تم إرسال الرابط!
            </h2>
            <p className="text-gray-600 mb-6">
              تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني:{" "}
              <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              يرجى مراجعة بريدك الإلكتروني والنقر على الرابط لإعادة تعيين كلمة
              المرور. إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition"
            >
              <FaArrowLeft />
              العودة لتسجيل الدخول
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
            نسيت كلمة المرور؟
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                البريد الإلكتروني <span className="text-red-500">*</span>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-lg text-lg font-bold transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري الإرسال...
                </>
              ) : (
                "إرسال رابط إعادة التعيين"
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
