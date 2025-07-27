import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminContentManager from "./components/Dashboard/AdminContentManager";
import DashboardOverview from "./components/Dashboard/DashboardOverview";
import StudentsPage from "./components/Dashboard/StudentsPage";
import TeachersPage from "./components/Dashboard/TeachersPage";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:encoded_pk/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <DashboardOverview />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedAdminRoute>
              <AdminContentManager />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedAdminRoute>
              <StudentsPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedAdminRoute>
              <TeachersPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <DashboardOverview />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
