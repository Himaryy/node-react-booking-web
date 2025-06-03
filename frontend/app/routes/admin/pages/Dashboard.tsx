import { useAuth } from "hooks/AuthProvider";
import React from "react";
import { Navigate, useLocation } from "react-router";

const Dashboard = () => {
  const { admin, isLoadingAdmin } = useAuth();
  const location = useLocation();

  if (isLoadingAdmin) {
    return null;
  }
  if (!admin) {
    return <Navigate to="/login-admin" state={{ from: location }} replace />;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
