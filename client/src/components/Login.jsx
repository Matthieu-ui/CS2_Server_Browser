import React from 'react';

const Login = ()=> {
  return (
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
    href="https://steamapiforum.onrender.com/api/auth/steam">
    <img 
    className="hover:brightness-125 transition duration-500 ease-in-out hover:animate-pulse"
    src="steamAuth.png" alt="Steam Login"/>
    
    </a>
   
    </div>
</section>
  );
};

export default Login;

