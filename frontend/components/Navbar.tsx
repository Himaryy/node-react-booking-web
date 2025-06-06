import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-white h-16 shadow-sm flex justify-between items-center gap-2">
      <Link to="/" className="relative inline-flex items-center h-full px-2  ">
        <div className="relative px-2 group">
          <span className="transition-colors duration-200 ease-in text-2xl">
            Home
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 ease-in group-hover:w-full"></span>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
