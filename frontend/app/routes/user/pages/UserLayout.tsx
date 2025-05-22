import Navbar from "~/components/Navbar";
import React from "react";
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
