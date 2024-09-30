import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
