import React from "react";
import DashboardLayout from "./DashboardLayout";
import StudentsManager from "./UserManager/components/StudentsManager";

const StudentsPage = () => {
  return (
    <DashboardLayout activeTab="students">
      <StudentsManager />
    </DashboardLayout>
  );
};

export default StudentsPage;
