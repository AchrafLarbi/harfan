import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, activeTab = "content" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      name: "الرئيسية",
    },
    {
      id: "language",
      name: "اللغة العربية",
    },
    {
      id: "quran",
      name: "القرآن الكريم",
    },
    {
      id: "conversations",
      name: "المحادثات",
    },
    {
      id: "content",
      name: "إدارة المحتوى",
    },
    {
      id: "settings",
      name: "إعدادات",
    },
    {
      id: "shortcuts",
      name: "اختصارات",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
      />

      {/* Main content area */}
      <div className="flex-1 lg:mr-80 flex flex-col min-h-screen">
        {/* Fixed Top navigation */}
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

        {/* Scrollable Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
