import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const Dashboard = () => {
    const [selectedAppId, setSelectedAppId] = useState(730);
    const [selectedAppName, setSelectedAppName] = useState("Counter-Strike 2");
    const [selectedOnlinePlayers, setSelectedOnlinePlayers] = useState(0);

    useEffect(() => {
        const appId = selectedAppId || '730'; // default value if no parameter is provided
        axios.get(`/api/stats/${appId}`)
            .then(response => {
                setSelectedOnlinePlayers(response.data.response.player_count);
            })
            .catch(error => {
                console.log(error);
            });
    }, [selectedAppId]);

    return (
        <div className="flex overflow-auto bg-secondary min-h-screen">
            <div className="flex-1 flex flex-col">
                <Header
                    headerTitle="Steam webAPI Discussion Board"
                    headerDescription="The Steam Web API Discussion Board is a free open-source tool for searching Steam's app and community data as well as a discussion board for Steam Web API developers."
                />
                
                <main className="flex-1 bg-secondary max-w-screen-lg mx-auto p-5 text-white">
                    <div className="text-center my-5">

                        <h2 className="text-2xl mb-2">
                            {selectedAppName}: Users Online:
                        </h2>

                        <span className="text-green-600 animate-pulse drop-shadow-sm font-bold text-3xl">
                            {selectedOnlinePlayers.toLocaleString()}
                        </span>

                    </div>

                    <div className="text-center my-5">

                    <h2 className="text-2xl mb-2">
                        Servers Online:
                    </h2>

                    <span className="text-green-600 animate-pulse drop-shadow-sm font-bold text-3xl">
                        {selectedOnlinePlayers.toLocaleString()}
                    </span>

                </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
