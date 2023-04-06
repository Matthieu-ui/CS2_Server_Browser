import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import OnlinePlayers from "./OnlinePlayers";
import Dashboard from "./Dashboard"; // Import the Dashboard component

const SearchResult = ({ results, onSelect, setSearchTerm, selectedAppId, setOnlinePlayersData }) => {

  const [selectedAppName, setSelectedAppName] = useState(null);
  const [onlinePlayersCount, setOnlinePlayersCount] = useState(null); // New state variable
  const handleClick = async (appid, name) => {
    try {
      const response = await fetch(`/api/stats/${appid}`);
      const data = await response.json();
      setOnlinePlayersCount(data.response.player_count);
      onSelect(appid, name);
      setSelectedAppName(name);
      setOnlinePlayersData([{ playerCount: data.response.player_count, timestamp: Date.now() }]);
      updateDashboard(name, data.response.player_count);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDashboard = (name, playerCount) => {
    setSelectedAppName(name);
    setOnlinePlayersCount(playerCount);
  };

  return (
    <div className="relative w-full">
      <div className="container mx-auto p-2">
        <input
          className="hidden text-white rounded-md nm-inset-secondary-sm hover:nm-inset-secondary-lg cursor-pointer w-full focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search apps"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {results.length > 0 && (
          <ul className="z-10 w-full nm-inset-primary-lg rounded-md mt-1 overflow-y-auto max-h-48 shadow-lg p-1">
            {results.slice(0, 5).map((result) => (
              <li
                key={uuidv4()} 
                className={`my-2 m-auto block p-1 text-gray-400 hover:text-white focus:text-white cursor-pointer ${
                  result.appid === selectedAppId ? 'nm-concave-primary-xs' : 'nm-inset-secondary-lg'
                } rounded-tr-lg rounded-br-lg focus:nm-inset-secondary-sm`}
                onClick={() => handleClick(result.appid, result.name)}
              >
                {result.name}
                <div className="text-gray-400 text-sm">
                  appId: {result.appid}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {selectedAppName && (
        <div>
          Selected App: {selectedAppName}
          online players: {onlinePlayersCount}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
