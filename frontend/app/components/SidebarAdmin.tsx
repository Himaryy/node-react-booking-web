import { useAuth } from "hooks/AuthProvider";
import { useState } from "react";
import { SlLogout } from "react-icons/sl";
import { OrbitProgress } from "react-loading-indicators";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { MdOutlineMeetingRoom } from "react-icons/md";

const SidebarAdmin = () => {
  const { admin, logoutAdmin } = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === "/tambah-ruangan";

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
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link
            to="/tambah-ruangan"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-gray-700 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <MdOutlineMeetingRoom className="w-5 h-5" />
            <span>Tambah Ruangan</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center justify-between w-full mt-6 p-4 border-t border-gray-700 text-white">
        <div className="">
          <p className="text-sm font-semibold truncate">{admin?.name}</p>
          <p className="text-xs text-gray-400 truncate">{admin?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLogout}
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
