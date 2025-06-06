import { Outlet } from "react-router";
import SidebarAdmin from "~/components/SidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      <SidebarAdmin />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
