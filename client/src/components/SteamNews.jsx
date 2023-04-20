import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

function SteamNews() {

    const [news, setNews] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [selectedAppName, setSelectedAppName] = useState("Counter-Strike: Global Offensive");

  
    useEffect(() => {
      axios.get(`/api/news/${selectedAppId}`)
        .then(response => {
          setNews(response.data.appnews.newsitems);
        })
        .catch(error => {
          console.log(error);
        });
    }, [selectedAppId]);

 

    const handleSelect = (appId, appName) => {
      // console.log("Selected App ID: ", appId);
      // console.log("Selected App Name: ", appName);
      setSelectedAppId(appId);
      setSelectedAppName(appName);
    };

  
    return (
      <div className="flex-1 flex flex-col">
        {selectedAppId && selectedAppNews.length > 0 ? (
          <div className="flex flex-col container mx-auto overflow-y-auto rounded-lg shadow-lg nm-concave-primary-lg m-1">
            <h3 className="text-white text-2xl font-medium p-2">{selectedAppNews[0].title}</h3>
            <div className="text-gray-300 p-2">{parse(selectedAppNews[0].contents)}<a className='text-blue-500 hover:text-blue-700' href={selectedAppNews[0].url} target="_blank" rel="noopener noreferrer">Read more</a></div>
          </div>
        ) : (
          news.map((item, index) => (
            <div key={index} className="flex flex-col container mx-auto overflow-y-auto rounded-lg shadow-lg nm-concave-primary-lg m-1">
              <h3 className="text-white text-2xl font-medium p-2">{item.title}</h3>
              <div className="text-gray-300 p-2">{parse(item.contents)}<a className='text-blue-500 hover:text-blue-700' href={item.url} target="_blank" rel="noopener noreferrer">Read more</a></div>
            </div>
          ))
        )}
      </div>
    );
  }

export default SteamNews;
  