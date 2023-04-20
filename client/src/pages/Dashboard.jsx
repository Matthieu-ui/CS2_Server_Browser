import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchApps from "../components/SearchApp";


const Dashboard = () => {



    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState(730);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedAppName, setSelectedAppName] = useState("Counter-Strike: Global Offensive");

    //set default selected app to
    const [selectedOnlinePlayers, setSelectedOnlinePlayers] = useState(0);

    useEffect(() => {
        const defaultAppId = '730'; // set a default value for the app id
        const appId = selectedAppId || defaultAppId; // use default value if no parameter is provided
        axios.get(`/api/stats/${appId}`)
            .then(response => {

                setOnlinePlayers(response.data);
                setSelectedOnlinePlayers(response.data.response.player_count); // set the default selected app to Counter-Strike: Global Offensive
            })
            .catch(error => {
                console.log(error);
            });
    }, [selectedAppId]);

    const handleSelect = (appId, appName, onlinePlayers) => {
        // console.log("Selected App ID: ", appId);
        // console.log("Selected App Name: ", appName);
        // console.log("Selected App Online Players: ", onlinePlayers);
        setSelectedAppId(appId);
        setSelectedAppName(appName);
        setSelectedOnlinePlayers(onlinePlayers);

    };

    return (
        <div className="flex-1 flex flex-col h-screen">
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
                                setSelectedOnlinePlayers={setSelectedOnlinePlayers}
                            />


                        </div>
                        <div className="nm-convex-secondary-sm container mx-auto p-5 md:w-1/3 text-center">

                            <h2 className="text-white text-xs">App ID:
                                <span className="text-accent font-bold p-1">{selectedAppId}</span>

                            </h2>

                            <h2 className="m-2 text-lg">
                                <span className="text-accent drop-shadow-sm font-bold">{selectedAppName}</span>
                            </h2>

                            <h2 className="text-white text-xs mb-2">Users Online:
                                <span className="text-green-600 animate-pulse drop-shadow-sm font-bold p-2">{selectedOnlinePlayers.toLocaleString()}</span>
                            </h2>

                            <img
                                src={`https://steamcdn-a.akamaihd.net/steam/apps/${selectedAppId}/header.jpg`}
                                alt="selected app"
                                className=" mx-auto border rounded-lg nm-convex-secondary-lg"
                            />
                        </div>

                        <div className="nm-convex-secondary-sm container mx-auto p-5 md:w-1/3">
                
                        </div>
                    </div>

                    <div className="container px-6 py-8 w-full ">
                        <div className="nm-convex-secondary-sm container mx-auto p-5">
                            graphical data component
                        </div>
                    </div>

                    <div className="container px-6 py-8 w-full ">

                        {/*steamNews*/}
                        <div className="nm-convex-secondary-sm container mx-auto p-5">
                         
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
