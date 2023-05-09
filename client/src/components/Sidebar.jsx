import { Link, Outlet } from "react-router-dom";
import React from "react";

function Sidebar() {


  return (
    <div className="flex">
      <nav className="bg-primary w-36 pr-1 hidden sm:block md:block lg:block xl:block">
      
      <div className="flex items-center justify-center h-16 text-xl font-bold bg-gray-800 nm-inset-primary-sm p-3 rounded-br-lg">
        <img
        src="isoblokfurbish.png"
  
        className="w-10 h-10 drop-shadow-sm hover:drop-shadow-md transition duration-200 ease-in-out hover:scale-110 transform brightness-110"
      />


      <span className="font-bold p-2 text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-sm">
        SADBB{" "}

      </span>
        </div>

        <div className="mt-2 h-56">
          <div className="h-36">
            <Link
              to="/"
              className="block py-2 px-4 text-accent hover:brightness-150 focus:brightness-150  nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg focus:nm-inset-secondary-sm"
            >
              Dashboard
            </Link>

            <Link to="/blog" className="block py-2 px-4 text-accent hover:brightness-150 focus:brightness-150 focus:nm-inset-secondary-sm nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg">
            Discussion
          </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-accent hover:brightness-150  focus:brightness-150 focus:nm-inset-secondary-sm nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg"
            >
              SteamData
            </Link>


            <Link to="/account" className="block py-2 px-4 text-accent hover:brightness-150 focus:brightness-150 focus:nm-inset-secondary-sm nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg">
            Account
            </Link>
            
            <Link
              to="/contact"
              className="block py-2 px-4  text-accent hover:brightness-150 focus:brightness-150 focus:nm-inset-secondary-sm  nm-concave-primary-xs hover:nm-inset-secondary-lg rounded-tr-lg rounded-br-lg"
            >
              Contact
            </Link>
          </div>

        </div>

      </nav>
        <div className="flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;