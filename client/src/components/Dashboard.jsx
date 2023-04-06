import React, { useState, useEffect } from "react";
import SteamNews from "./SteamNews";
import axios from "axios";
import OnlinePlayers from "./OnlinePlayers";
import OnlinePlayersChart from "./OnlinePlayersChart";


const Dashboard = () => {

    const [news, setNews] = useState([]);
    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState();

    useEffect(() => {
        axios.get("/api/stats")
            .then(response => {
                setOnlinePlayers(response.data.response.players);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("/api/news")
            .then(response => {
                setNews(response.data.appnews.newsitems);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const appId = selectedAppId;

    return (
        <div className="flex-1 flex flex-col overflow-hidden h-screen">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
                    <div className="grid grid-cols-3 gap-4 m-5">
                        <div className="nm-convex-secondary-sm container mx-auto p-5 max-w-full">

                            <OnlinePlayers appId={appId} />

                        </div>
                    </div>

                    <div className="container mx-auto px-6 py-8">
                    <OnlinePlayersChart onlinePlayersData={onlinePlayers} />
                            
                        <div className="nm-convex-secondary-sm container mx-auto p-5 max-w-full ">

                 

                            <h3 className="text-gray-00 text-3xl font-medium">Steam Search Dashboard</h3>
                            <p className="mt-1 text-gray-600">This is a simple dashboard template built using Tailwind CSS.</p>

                            <h1 className="text-white text-2xl font-medium p-2">Latest News</h1>
                            <div className="h-80 overflow-y-auto rounded-lg shadow-lg nm-concave-primary-lg m-1 
                            scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-600 scrollbar-thumb-rounded-full p-5
                            ">

                                <SteamNews selectedAppId={selectedAppId} />

                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
