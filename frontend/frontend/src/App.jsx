import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import TaskMonitoring from "./pages/TaskMonitoring";
import ActivityLogs from "./pages/ActivityLogs";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ marginLeft: "220px", width: "100%" }}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ActivityLogs />
                </ProtectedRoute>
              }
            />

            <Route path="/tasks" element={<TaskMonitoring />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}