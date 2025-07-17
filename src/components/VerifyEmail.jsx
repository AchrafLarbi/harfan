import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setVerificationStatus("error");
        setMessage("رمز التحقق غير موجود");
        return;
      }

      try {
        await authAPI.verifyEmail(token);
        setVerificationStatus("success");
        setMessage(
          "تم تفعيل البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول."
        );

        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setVerificationStatus("error");
        setMessage(
          "فشل في تفعيل البريد الإلكتروني. الرابط قد يكون منتهي الصلاحية أو غير صحيح."
        );
        console.error("Email verification error:", error);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const closePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      dir="rtl"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        {/* Content based on verification status */}
        <div className="text-center">
          {verificationStatus === "loading" && (
            <>
              <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                جاري التحقق من البريد الإلكتروني...
              </h2>
              <p className="text-gray-600">
                يرجى الانتظار بينما نتحقق من صحة الرابط
              </p>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                تم التفعيل بنجاح!
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500 mb-4">
                سيتم توجيهك إلى صفحة تسجيل الدخول خلال 3 ثوان...
              </p>
              <button
                onClick={goToLogin}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                تسجيل الدخول الآن
              </button>
            </>
          )}

          {verificationStatus === "error" && (
            <>
              <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                فشل في التفعيل
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-2">
                <button
                  onClick={goToLogin}
                  className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  العودة لتسجيل الدخول
                </button>
                <button
                  onClick={closePopup}
                  className="w-full bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  إغلاق
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
