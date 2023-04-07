import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchApps from "./SearchApp";

const Dashboard = () => {

    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState(730);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedAppName, setSelectedAppName] = useState("Counter-Strike: Global Offensive");
   
  

    useEffect(() => {
        axios.get(`/api/stats/${selectedAppId}`)
            .then(response => {
  
                setOnlinePlayers(response.data);    

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

const handleSelect = (appId, appName) => {
    console.log("Selected App ID: ", appId);
    console.log("Selected App Name: ", appName);
  setSelectedAppId(appId);
  setSelectedAppName(appName);

};

    return (
        <div className="flex-1 flex flex-col overflow-hidden h-screen">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
                    <div className="flex flex-col md:flex-row md:gap-3 m-5">
                        <div className="nm-convex-secondary-sm container mx-auto p-5 md:w-1/3 ">
                            <SearchApps
                                appId={selectedAppId}
                                searchResults={searchResults}
                                setSearchResults={setSearchResults}
                                onSelect={handleSelect}
                                appName={selectedAppName}
                                setSelectedAppId={setSelectedAppId}
                                setSelectedAppName={setSelectedAppName}

                            />

          
                        </div>
                        <div className="nm-convex-secondary-sm container mx-auto p-5 md:w-1/3 text-center">

                            <h2 className="text-white text-xs">App ID: 
                                <span className="text-accent font-bold p-1">{selectedAppId}</span>

                            </h2>

                            <h2 className="m-2 text-lg">
                                <span className="text-accent drop-shadow-sm font-bold">{
                                    selectedAppName
                                }</span>
                            </h2>

                            <img
                                src={`https://steamcdn-a.akamaihd.net/steam/apps/${selectedAppId}/header.jpg`}
                                alt="selected app"
                                className=" mx-auto border rounded-lg nm-convex-primary-lg"
                            />
                        </div>
                        <div className="nm-convex-secondary-sm container mx-auto p-5 md:w-1/3">
                            data type component
                        </div>
                    </div>

                    <div className="container px-6 py-8 md:w-2/3">
                      

                    
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
