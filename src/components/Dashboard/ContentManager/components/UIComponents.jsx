import React from "react";

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

export const AlertMessage = ({ type, message, onClose }) => {
  const baseClasses = "border px-4 py-3 rounded mb-4";
  const typeClasses = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-lg font-bold opacity-70 hover:opacity-100"
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
  const baseClasses = "font-bold rounded transition-colors";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    success: "bg-green-500 hover:bg-green-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  const sizes = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6",
  };

  const disabledClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses}`}
      {...props}
    >
      {loading ? "جاري التحميل..." : children}
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
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div
        className={`relative top-10 mx-auto p-6 border ${sizeClasses[size]} shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
