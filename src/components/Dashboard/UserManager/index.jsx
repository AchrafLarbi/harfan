import React, { useState } from "react";
import StudentsManager from "./components/StudentsManager";
import TeachersManager from "./components/TeachersManager";

const UserManager = () => {
  const [activeTab, setActiveTab] = useState("students");

  const tabs = [
    {
      id: "students",
      name: "إدارة الطلاب",
      component: StudentsManager,
    },
    {
      id: "teachers",
      name: "إدارة الأساتذة",
      component: TeachersManager,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          إدارة المستخدمين
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default UserManager;
