import { Link, Outlet } from "react-router-dom";
import React from "react";

function Sidebar() {


  return (
    <div className="flex h-screen">
      <nav className="bg-primary w-48 pr-1">
        <div className="flex items-center justify-center h-16 text-white text-xl font-bold bg-gray-800 nm-inset-primary-sm p-3 rounded-br-lg">
          <img
            src="logo1.png"
            alt="logo"
            className="w-10 h-10 mr-2 brightness-200 hover:hue-rotate-180 transition duration-500 ease-in-out hover:scale-105"
          />
          <span className="text-white font-bold text-lg tracking-tight">
            Steam_Dash{" "}
            <small className="text-xs">1.0.0</small>
          </span>
        </div>

        <div className="mt-2 h-56">
          <div className="h-36">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-400 hover:text-white focus:text-white nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg focus:nm-inset-secondary-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-gray-400 hover:text-white focus:text-white focus:nm-inset-secondary-sm nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-gray-400 hover:text-white focus:text-white focus:nm-inset-secondary-sm  nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg"
            >
              Contact
            </Link>
          </div>

        </div>

      </nav>
        <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;