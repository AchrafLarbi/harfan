import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEdit,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBook,
  FaComments,
  FaPlus,
  FaChevronUp,
  FaLanguage,
} from "react-icons/fa";
import { authAPI } from "../../services/api";
import logo from "../../assets/logo/logo.png";

const Sidebar = ({ isOpen, onClose, activeTab = "content" }) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const navigate = useNavigate();

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
      id: "language",
      name: "اللغة العربية",
      icon: FaLanguage,
      hasSubmenu: true,
      submenu: [
        { name: "العربية هويتي", path: "/admin/arabic-identity" },
        { name: "العربي الفصيح", path: "/admin/arabic-classic" },
      ],
    },
    {
      id: "quran",
      name: "القرآن الكريم",
      icon: FaBook,
      path: "/admin/quran",
    },
    {
      id: "conversations",
      name: "المحادثات",
      icon: FaComments,
      path: "/admin/conversations",
    },
    {
      id: "content",
      name: "إدارة المحتوى",
      icon: FaEdit,
      path: "/admin/content",
    },
    {
      id: "settings",
      name: "إعدادات",
      icon: FaCog,
      path: "/admin/settings",
    },
    {
      id: "shortcuts",
      name: "اختصارات",
      icon: FaPlus,
      path: "/admin/shortcuts",
    },
  ];

  // Mock users for the sidebar (replace with real data)
  const recentUsers = [
    { name: "الغريب محمد اشرف", avatar: "🧑‍💼" },
    { name: "وراد ساسيبيل", avatar: "👩‍💼" },
    { name: "براهيمي ايمن", avatar: "👨‍💼" },
    { name: "وراد اسلام شرف الدين", avatar: "👤" },
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
            <img src={logo} alt="Harfan Logo" className="h-16 w-auto" />
          </div>
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold mb-1">حرفان</h1>
            <p className="text-slate-300 text-sm">HARFAN</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 left-4 text-white hover:text-gray-300"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* User Status */}
        <div className="px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">روابط</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
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

        {/* Recent Users Section */}
        <div className="border-t border-slate-700 p-4 flex-shrink-0">
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm">
                    {user.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 truncate">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout button */}
        <div className="border-t border-slate-700 p-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 w-full transition-colors duration-200"
          >
            <FaSignOutAlt className="ml-3 flex-shrink-0 h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
