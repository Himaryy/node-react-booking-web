import Navbar from "~/components/Navbar";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div>
      <Navbar />

      <aside>
        <Outlet />
      </aside>
    </div>
  );
};

export default UserLayout;
