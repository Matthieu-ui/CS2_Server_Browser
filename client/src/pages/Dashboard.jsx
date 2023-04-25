import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchApps from "../components/SearchApp";
import HomeFeed from "../components/HomeFeed";
import {Link} from "react-router-dom";
import { Icon } from "@iconify/react";

const Dashboard = () => {

    //home feed
    const [posts, setPosts] = useState([]);
    const [upvoteCounts, setUpvoteCounts] = useState({});
    const [commentCounts, setCommentCounts] = useState({});
    const [showPosts, setShowPosts] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [postId, setPostId] = useState(null);




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

        <div className="flex h-screen overflow-scroll bg-secondary">
            <div className="flex-1 flex flex-col">
            <div className="header flex nm-concave-primary-sm p-5 flex-col">
            <span className="flex items-center">
              <img className="h-20 w-20 brightness-150" src="isoblokfurb.png" alt="SDDB" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm tracking-wider p-5">
                SDDB
              </h1>
            </span>
            <div className="flex-1 flex text-sm">
              <p className="mt-1 text-orange-600 w-2/3 opacity-80">
      Steam Database Blog is a free open-source tool for searching Steam's app and community data. It is not affiliated with Valve or Steam in any way.
              </p>
            </div>
          </div>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
                    <div className="flex flex-col md:flex-row md:gap-3 m-5">
                        <div className="container mx-auto p-5 w-60">
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
                       
                       <p className="text-accent animate-pulse text-xs mb-2">News component is currently down. Please check back later.</p>
                       
                       <Icon icon="material-symbols:construction-rounded" className="text-accent mx-auto h-60 w-60" />
                         
                    
                
                        </div>
                    </div>

                    
                        <span
                            className="ml-10 mt-10 flex items-center mx-5 my-5 text-white text-xl font-bold flex-auto justify-start"
                        >
                            <h3
                            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
                            Home Feed</h3>

                            <Link to="/blog">
                                <button className=" ml-10 nm-convex-secondary-sm rounded-lg text-white text-xl font-bold p-2 hover:nm-inset-primary-lg">
                                    Create Post
                                </button>
                            </Link>
                       
                            <Link to="#">
                                <button className="mx-auto flex items-center ml-10 nm-convex-secondary-sm rounded-lg text-white text-xl font-bold p-2 hover:nm-inset-primary-lg align-middle">
                                <Icon icon="ic:twotone-verified-user" className="text-accent mx-auto h-6 w-6" /><p className="p-1"> Link Steam with OpenId</p>
                                </button>
                            </Link>
                            </span>
                
                           


                   
                        {/*home feed*/}
                    
                            <HomeFeed   
                                posts={posts}
                                setPosts={setPosts}
                                upvoteCounts={upvoteCounts}
                                setUpvoteCounts={setUpvoteCounts}
                                commentCounts={commentCounts}
                                setCommentCounts={setCommentCounts}
                                showPosts={showPosts}
                                setShowPosts={setShowPosts}
                                showComments={showComments}
                                setShowComments={setShowComments}
                                postId={postId}
                                setPostId={setPostId}
                            />

                     
         
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
