import { Outlet } from "react-router";
import SidebarAdmin from "~/components/SidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      <SidebarAdmin />
      <aside>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
