// src/ServerList.js
import React, { useState, useEffect } from 'react';

const ServerList = () => {
  const [servers, setServers] = useState([]);
  const [activeServers, setActiveServers] = useState(0);  // New state for active servers
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerList = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/servers');
        const data = await response.json();
        setServers(data.servers);
        setActiveServers(data.activeServers);  // Set the number of active servers
        setLoading(false);
      } catch (error) {
        console.error('Error fetching server list:', error);
        setLoading(false);
      }
    };

    fetchServerList();
  }, []);

  return (
    <div className="items-center justify-center font-bold bg-gray-800 nm-inset-primary-sm p-3 rounded-br-lg">
      <h1>Server List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Number of active servers: {activeServers}</p>  {/* Display number of active servers */}
          <ul>
            {servers.map((server, index) => (
              <li key={index} className='nm-flat-primary-xs border p-1 m-1 rounded-md'>
                <a>{`Server ${index + 1}: ${server.ip}:${server.port} - ${server.details ? server.details.name : 'Unknown'}`}</a>
                {server.details && (
                  <>
                    <p>Map: {server.details.map}</p>
                    <p>Players: {server.details.players}/{server.details.maxPlayers}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ServerList;
