import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEdit,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import { authAPI } from "../../services/api";

const DashboardLayout = ({ children, activeTab = "content" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
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
      name: "نظرة عامة",
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
      id: "users",
      name: "إدارة المستخدمين",
      icon: FaUsers,
      path: "/admin/users",
    },
    {
      id: "analytics",
      name: "التحليلات",
      icon: FaChartBar,
      path: "/admin/analytics",
    },
    {
      id: "settings",
      name: "الإعدادات",
      icon: FaCog,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-primary text-white">
          <div className="flex items-center">
            <FaUserShield className="h-8 w-8 ml-2" />
            <span className="text-lg font-semibold">لوحة الإدارة</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.firstName?.charAt(0) || "A"}
              </div>
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors duration-200`}
                >
                  <Icon
                    className={`${
                      isActive ? "text-white" : "text-gray-400"
                    } ml-3 flex-shrink-0 h-5 w-5`}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 w-full p-2">
          <button
            onClick={handleLogout}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-900 w-full transition-colors duration-200"
          >
            <FaSignOutAlt className="text-red-400 ml-3 flex-shrink-0 h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pr-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">فتح الشريط الجانبي</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <h1 className="text-lg font-semibold text-gray-900">
                {menuItems.find((item) => item.id === activeTab)?.name ||
                  "لوحة الإدارة"}
              </h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
