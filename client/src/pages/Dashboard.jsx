import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchApps from "../components/SearchApp";
import HomeFeed from "../components/HomeFeed";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import NewsItem from "../components/NewsItem";
import Header from "../components/Header";

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

    //get news
    const [news, setNews] = useState([]);



    useEffect(() => {
        const defaultAppId = '730'; // set a default value for the app id
        const appId = selectedAppId || defaultAppId;
        axios.get(`/api/news/${appId}`)
            .then(response => {
                setNews(response.data.appnews.newsitems);
                console.log(response.data.appnews.newsitems);
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


        <div className="flex overflow-auto bg-secondary">
        <div className="flex-1 flex flex-col">
    

                <Header 
                headerTitle="Steam webAPI Discussion Board" 
                headerDescription="The Steam Web API Discussion Board is a free open-source tool for searching Steam's app and community data as well as a discussion board for Steam Web API developers." 
              />


                <main className="flex-1 bg-secondary max-w-screen-lg mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                        <div className=" mx-auto p-5 text-center">
                            <div class="w-full nm-flat-primary-sm p-2 mb-4">

                        
                                <img
                                    src={`https://steamcdn-a.akamaihd.net/steam/apps/${selectedAppId}/header.jpg`}
                                    alt="selected app"
                                    class="border rounded-sm object-cover"
                                />
                            </div>


                            <div class="flex flex-col md:flex-row">
                                <div class="w-full ">
                                    <div class=" mx-auto p-5 nm-flat-secondary-sm">

                                        <h2 class="text-white text-xs">
                                            App ID:
                                            <span class="text-accent font-bold p-1">{selectedAppId}</span>
                                        </h2>

                                        <h2 class="m-2 text-lg">
                                            <span class="text-accent drop-shadow-lg font-bold">{selectedAppName}</span>
                                        </h2>

                                        <h2 class="text-white text-xs">
                                            Users Online:
                                            <span class="text-green-600 animate-pulse drop-shadow-sm font-bold p-2">{selectedOnlinePlayers.toLocaleString()}</span>
                                        </h2>

                                    </div>
                                </div>
                            </div>


                            <div className=" mx-auto text-center">
                                <div class="w-full nm-flat-secondary-sm p-2 mb-4">
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
                            </div>
                        </div>



                        <div className="nm-convex-secondary-sm  mx-auto p-5 w-full">

                            <h2 className="text-white text-xs">News for:
                                <span className="text-accent font-bold p-1">{selectedAppName}</span>

                            </h2>

                            <div className="flex flex-col mt-5">
                                {news.map((newsItem, index) => (
                                    <NewsItem
                                        key={index}
                                        title={newsItem.title}
                                        url={newsItem.url}
                                        author={newsItem.author}
                                        contents={newsItem.contents}
                                        date={newsItem.date}
                                        feedlabel={newsItem.feedlabel}
                                        feedname={newsItem.feedname}
                                        feed_type={newsItem.feed_type}
                                        appid={newsItem.appid}
                                        img_url={newsItem.img_url}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* HOMEFEED*/}
                
                    <span
                        className="ml-10 mt-10 flex items-center mx-5 my-5 text-white text-xl font-bold flex-auto justify-start"
                    >
                        <h3
                            className="text-4xl mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
                            Community Discussion</h3>

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

}

export default Dashboard;
