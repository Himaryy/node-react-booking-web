import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "hooks/AuthProvider";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogout(true);

    setTimeout(() => {
      logout();
      setIsLogout(false);

      toast.success("Logout Berhasil", {
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" },
      });

      navigate("/sign-in");
    }, 1000);
  };

  return (
    <header className="bg-white h-16 shadow-sm flex justify-between items-center px-4 gap-2">
      <Link to="/" className="relative inline-flex items-center h-full px-2  ">
        <div className="relative px-2 group">
          <span className="transition-colors duration-200 ease-in font-bold text-lg">
            Home
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 ease-in group-hover:w-full"></span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {/* Jika loading dan ada kemungkinan user sebelumnya sudah login (token ada), tampilkan skeleton */}
        {isLoading ? (
          <>
            <Skeleton className="w-32 h-6 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          </>
        ) : user ? (
          <>
            <Link
              to="/daftar-booking"
              className="relative inline-flex items-center h-full px-2"
            >
              <div className="relative px-2 group">
                <span className="transition-colors duration-200 ease-in text-lg">
                  Daftar Booking
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 ease-in group-hover:w-full"></span>
              </div>
            </Link>

            <Popover>
              <PopoverTrigger>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-30 mt-2 mr-4 bg-white border border-black rounded-md shadow-md z-10">
                <button
                  onClick={handleLogout}
                  disabled={isLogout}
                  className="w-full text-center py-2 rounded-md bg-black text-white hover:bg-gray-800 font-semibold transition-colors duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  Logout
                  {isLogout && (
                    <OrbitProgress style={{ fontSize: "4px" }} color="white" />
                  )}
                </button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          // Loading selesai dan user null -> tampilkan Login langsung
          <Link to="/sign-in" className="text-lg font-semibold">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
