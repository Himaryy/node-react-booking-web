import { Outlet } from "react-router";
import Navbar from "~/components/Navbar";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />

      <aside>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
