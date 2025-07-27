import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaEdit,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaComments,
  FaPlus,
  FaChevronUp,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { authAPI } from "../../services/api";
import { selectUser } from "../../store/slices/authSlice";
import logo from "../../assets/logo/logo2.png";

const Sidebar = ({ isOpen, onClose, activeTab = "content" }) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
  });

  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Get admin profile from Redux or localStorage
  useEffect(() => {
    if (user) {
      setAdminProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "admin",
      });
    } else {
      // Fallback to localStorage if Redux state is not available
      const storedUser = localStorage.getItem("harfan_user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setAdminProfile({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          role: userData.role || "admin",
        });
      }
    }
  }, [user]);

  // Generate initials from first name and last name
  const getInitials = () => {
    const firstName = adminProfile.firstName || "";
    const lastName = adminProfile.lastName || "";

    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (lastName) {
      return lastName.charAt(0).toUpperCase();
    }
    return "A"; // Default fallback
  };

  // Get display name
  const getDisplayName = () => {
    const firstName = adminProfile.firstName || "";
    const lastName = adminProfile.lastName || "";

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else if (adminProfile.email) {
      return adminProfile.email;
    }
    return "المدير"; // Default fallback
  };

  // Get role display name in Arabic
  const getRoleDisplayName = () => {
    switch (adminProfile.role) {
      case "admin":
        return "المدير";
      case "teacher":
        return "معلم";
      case "student":
        return "طالب";
      default:
        return "المدير";
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      id: "overview",
      name: "الرئيسية",
      icon: FaHome,
      path: "/admin/dashboard",
    },
    {
      id: "content",
      name: "إدارة المحتوى",
      icon: FaEdit,
      path: "/admin/content",
    },
    {
      id: "students",
      name: "إدارة الطلاب",
      icon: FaUserGraduate,
      path: "/admin/students",
    },
    {
      id: "teachers",
      name: "إدارة الأساتذة",
      icon: FaChalkboardTeacher,
      path: "/admin/teachers",
    },
    {
      id: "settings",
      name: "إعدادات",
      icon: FaCog,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-slate-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center py-8 px-6 border-b border-slate-700 flex-shrink-0">
          <div className="mb-4">
            <img src={logo} alt="Harfan Logo" className="h-24 w-auto" />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 left-4 text-white hover:text-gray-300"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="px-6 py-2 border-b border-slate-700 flex-shrink-0">
          <span className="text-slate-300 text-sm font-medium">الروابط</span>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.hasSubmenu) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className={`${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    } group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <Icon className="ml-3 flex-shrink-0 h-5 w-5" />
                      {item.name}
                    </div>
                    <FaChevronUp
                      className={`h-4 w-4 transition-transform duration-200 ${
                        languageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {languageOpen && (
                    <div className="mr-8 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            navigate(subItem.path);
                            onClose();
                          }}
                          className="text-slate-400 hover:text-white hover:bg-slate-700 block px-4 py-2 text-sm rounded-lg w-full text-right transition-colors duration-200"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                } group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors duration-200`}
              >
                <Icon className="ml-3 flex-shrink-0 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Admin Profile */}
        <div className="px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {getInitials()}
                </span>
              </div>
            </div>

            {/* Admin Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {getDisplayName()}
              </p>
              <p className="text-slate-400 text-xs">{getRoleDisplayName()}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 space-x-reverse"
            >
              <FaSignOutAlt className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
