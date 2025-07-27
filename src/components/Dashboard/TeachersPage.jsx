import React from "react";
import DashboardLayout from "./DashboardLayout";
import TeachersManager from "./UserManager/components/TeachersManager";

const TeachersPage = () => {
  return (
    <DashboardLayout activeTab="teachers">
      <TeachersManager />
    </DashboardLayout>
  );
};

export default TeachersPage;
