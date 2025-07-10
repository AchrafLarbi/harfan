import React from "react";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">إنشاء حساب جديد</h2>
      {/* Signup form goes here */}
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <input
          className="w-full mb-3 p-2 border rounded"
          type="text"
          placeholder="اسم المستخدم"
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="email"
          placeholder="البريد الإلكتروني"
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          placeholder="كلمة المرور"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">
          تسجيل
        </button>
      </form>
    </div>
  );
}
