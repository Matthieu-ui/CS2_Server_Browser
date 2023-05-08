import React from "react";
import { Icon } from "@iconify/react";
import Login from "../components/Login";
import Header from "../components/Header";


const Account = () => {

  //if not logged in, display login component
  //if logged in, display account component




  
  return (
    <div className="flex h-screen overflow-auto bg-secondary">
    <div className="flex-1 flex flex-col">
    <Header 
    headerTitle="Account" 
    headerDescription="Login to steam account to access your profile data and view your posts. Account verification is done through OpenID and is required to post."/>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary m-5 w-1/2 mx-auto">

        <Login />
        
        </main>
      </div>
    </div>
  );
};

export default Account;
