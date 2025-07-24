import React from "react";

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
    <div className="relative">
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200">
        <div className="absolute top-0 left-0 h-32 w-32 rounded-full border-4 border-transparent border-t-blue-600 animate-ping"></div>
        <div className="absolute top-0 left-0 h-32 w-32 rounded-full border-4 border-transparent border-t-indigo-600"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-xl px-6 py-3 shadow-lg border border-gray-200">
          <div className="text-gray-700 font-semibold flex items-center space-x-2">
            <div className="animate-pulse text-blue-600">⚡</div>
            <span>جاري التحميل...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AlertMessage = ({ type, message, onClose }) => {
  const baseClasses = "border rounded-xl px-6 py-4 mb-6 shadow-lg";
  const typeClasses = {
    error: "bg-red-50 border-red-200 text-red-800 shadow-red-100",
    success: "bg-green-50 border-green-200 text-green-800 shadow-green-100",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-xl font-bold opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200 focus:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-gray-200 focus:ring-gray-500",
    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-green-200 focus:ring-green-500",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-red-200 focus:ring-red-500",
  };

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const disabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span>جاري التحميل...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  ...props
}) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm ${
        error
          ? "border-red-300 focus:border-red-400 focus:ring-red-500"
          : "border-gray-300 focus:border-blue-400 focus:ring-blue-500 hover:border-gray-400"
      }`}
      {...props}
    />
    {error && <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>}
  </div>
);

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  error,
  ...props
}) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl bg-white border text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none shadow-sm ${
        error
          ? "border-red-300 focus:border-red-400 focus:ring-red-500"
          : "border-gray-300 focus:border-blue-400 focus:ring-blue-500 hover:border-gray-400"
      }`}
      {...props}
    />
    {error && <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>}
  </div>
);
export const Select = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  ...props
}) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-slate-200 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl bg-slate-700/50 border text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
        error
          ? "border-red-500/50 focus:border-red-400 focus:ring-red-500"
          : "border-slate-600/50 focus:border-blue-400 focus:ring-blue-500 hover:border-slate-500"
      }`}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-slate-700 text-white"
        >
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-sm mt-1 font-medium">{error}</p>}
  </div>
);

export const Modal = ({ isOpen, onClose, title, children, size = "lg" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-1/3",
    md: "w-1/2",
    lg: "w-3/4",
    xl: "w-11/12",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div
        className={`relative mx-auto p-8 border border-gray-200 ${sizeClasses[size]} shadow-2xl rounded-2xl bg-white max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200 hover:bg-gray-100 rounded-lg p-2"
          >
            ×
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};
