import { useAuth } from "hooks/AuthProvider";
import { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { OrbitProgress } from "react-loading-indicators";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineAddCircle,
  MdOutlineDashboard,
  MdOutlineFormatListBulleted,
  MdOutlineMeetingRoom,
} from "react-icons/md";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const SidebarAdmin = () => {
  const { admin, logoutAdmin, isLoadingAdmin } = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  const [isOpenMenuRuangan, setIsOpenMenuRuangan] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLogout(true);

    setTimeout(() => {
      logoutAdmin();
      setIsLogout(false);

      toast.success("Logout Berhasil", {
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" },
      });

      navigate("/login-admin");
    }, 1000);
  };

  useEffect(() => {
    if (
      location.pathname.includes("/catalog-ruangan") ||
      location.pathname.includes("/tambah-ruangan")
    ) {
      setIsOpenMenuRuangan(true);
    }
  }, [location.pathname]);

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {/* Dashboard */}
          <Button
            asChild
            className={`w-full px-4 py-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors flex items-center gap-3 ${
              location.pathname === "/dashboard"
                ? "bg-gray-700 text-white font-semibold"
                : ""
            }`}
          >
            <Link
              className="flex justify-start items-center gap-3"
              to="/dashboard"
            >
              <MdOutlineDashboard className="!size-6" />
              <span className="text-base">Dashboard</span>
            </Link>
          </Button>

          {/* Menu Ruangan */}
          <Button
            onClick={() => setIsOpenMenuRuangan(!isOpenMenuRuangan)}
            className="w-full flex justify-between py-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <MdOutlineMeetingRoom className="!size-6" />
              <span className="text-base">Ruangan</span>
            </div>
            {isOpenMenuRuangan ? (
              <MdKeyboardArrowDown className="!size-5" />
            ) : (
              <MdKeyboardArrowRight className="!size-5" />
            )}
          </Button>

          {/* Submenu Ruangan */}
          <div
            className={`w-full  overflow-hidden transition-all duration-500 flex flex-col gap-1 ${
              isOpenMenuRuangan ? "max-h-40" : "max-h-0"
            }`}
          >
            {/* <Button
              asChild
              className={`w-full py-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors flex items-center gap-3 ${
                location.pathname === "/catalog-ruangan"
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Link
                className="flex justify-center items-center gap-3"
                to="/catalog-ruangan"
              >
                <MdOutlineFormatListBulleted className="!size-6" />
                <span className="text-base">Catalog Ruangan</span>
              </Link>
            </Button> */}

            <Button
              asChild
              className={`w-full py-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors flex items-center gap-3 ${
                location.pathname === "/tambah-ruangan"
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Link
                className="flex justify-center items-center gap-3"
                to="/tambah-ruangan"
              >
                <MdOutlineAddCircle className="!size-6" />
                <span className="text-base">Tambah Ruangan</span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>

      {/* Footer: Logout */}
      <div className="flex items-center justify-between w-full mt-6 p-4 border-t border-gray-700 text-white">
        {admin ? (
          <div>
            <p className="text-sm font-semibold truncate">{admin.name}</p>
            <p className="text-xs text-gray-400 truncate">{admin.email}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24 bg-gray-700 rounded" />
            <Skeleton className="h-3 w-36 bg-gray-700 rounded" />
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={isLogout || !admin}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogout ? (
            <OrbitProgress style={{ fontSize: "4px" }} color="white" />
          ) : (
            <SlLogout className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
