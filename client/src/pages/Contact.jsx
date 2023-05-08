import React from "react";
import { Icon } from "@iconify/react";
import Header from "../components/Header";


const Contact = () => {




  
  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
    <div className="flex-1 flex flex-col">

        <Header headerTitle="Contact" headerDescription="Want to get in touch? Here's how." />

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
