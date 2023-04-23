import React from "react";
import { Icon } from "@iconify/react";


const Account = () => {




  
  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
    <div className="flex-1 flex flex-col">
        <div className="header flex nm-concave-primary-sm p-5 flex-col">
          <span className="flex items-center">
            <Icon
              icon="ic:twotone-verified-user"
              className="stroke-1 stroke-red-400 text-accent m-2 w-10 h-10 align-middle"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
              Account
            </h1>
          </span>
          <div className="flex-1 flex text-sm">
            <p className="mt-1 text-orange-600 w-2/3 opacity-80">
           This is the account page. View your steam account details and your blog posts.
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
     
         
  
          

         
        </main>
      </div>
    </div>
  );
};

export default Account;
