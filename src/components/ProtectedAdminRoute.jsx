import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Debug logging
  console.log("ProtectedAdminRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedAdminRoute - user:", user);

  // Check if user is authenticated and is admin/staff
  const isAdmin =
    isAuthenticated && user && (user.is_staff || user.is_superuser);

  console.log("ProtectedAdminRoute - isAdmin:", isAdmin);

  if (!isAdmin) {
    // Show access denied page or redirect to home
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.56 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            غير مسموح بالدخول
          </h1>
          <p className="text-gray-600 mb-4">
            عذراً، لا تملك الصلاحيات اللازمة للوصول إلى لوحة إدارة المحتوى.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              العودة للخلف
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
            >
              الذهاب للصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;
