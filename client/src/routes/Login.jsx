import React from "react";
import { Icon } from "@iconify/react";


const Login = () => {




  
  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
    <div className="flex-1 flex flex-col">
        <div className="header flex nm-concave-primary-sm p-5 flex-col">
          <span className="flex items-center">
            <Icon
              icon="mdi:openid"
              className=" text-accent m-2 w-10 h-10 align-middle"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
              Authenticate your Account
            </h1>
          </span>
          <div className="flex-1 flex text-sm">
            <p className="mt-1 text-orange-600 w-2/3 opacity-80">
           Verify your account with openID to access the full functionality of the site.
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">

        <section className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center w-full max-w-md px-4 py-8 bg-white rounded-lg shadow nm-convex-primary-sm sm:px-6 md:px-8 lg:px-10">
            <p className="mb-8 text-2xl font-semibold text-center text-accent">
            OpenID is a safe and secure way to verify your account.
            </p>
            <small className="mb-8 text-sm text-center text-gray-600">
            We will never share or save your personal information.
            </small>
            <a
            className="rounded-lg nm-flat-primary-lg hover:nm-flat-secondary-sm"
            href="http://localhost:5000/api/auth/steam">
            <img 
            className="hover:brightness-125 transition duration-500 ease-in-out hover:animate-pulse"
            src="steamAuth.png" alt="Steam Login"/>
            
            </a>
           
            </div>
        </section>
     
         
  
          

         
        </main>
      </div>
    </div>
  );
};

export default Login;
