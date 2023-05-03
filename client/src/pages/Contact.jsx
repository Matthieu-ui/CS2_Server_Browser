import React from "react";
import { Icon } from "@iconify/react";


const Contact = () => {




  
  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
    <div className="flex-1 flex flex-col">
        <div className="header flex nm-concave-primary-sm p-5 flex-col">
          <span className="flex items-center">
            <Icon
              icon="material-symbols:connect-without-contact-outline-rounded"
              className=" text-accent m-2 w-10 h-10 align-middle"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
Contact

</h1>
          </span>
          <div className="flex-1 flex text-sm">
            <p className="mt-1 text-orange-600 w-2/3 opacity-80">
Contact information for SDBB. Want to get in touch? Here's how.
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">

        <form className="flex flex-col p-5">
          <label className="text-lg font-bold text-orange-600">Name</label>
          <input className="p-2 mb-5 border-2 border-orange-600 rounded-lg" type="text" placeholder="Name" />
          <label className="text-lg font-bold text-orange-600">Email</label>
          <input className="p-2 mb-5 border-2 border-orange-600 rounded-lg" type="text" placeholder="Email" />
          <label className="text-lg font-bold text-orange-600">Message</label>
          <textarea className="p-2 mb-5 border-2 border-orange-600 rounded-lg" type="text" placeholder="Message" />
          <button className="p-2 mb-5 border-2 border-orange-600 rounded-lg" type="submit">Submit</button>
        </form>
        
     
         
  
          

         
        </main>
      </div>
    </div>
  );
};

export default Contact;
