// src/ServerList.js
import React, { useState, useEffect } from 'react';

const ServerList = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerList = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/servers');
        const serverList = await response.json();
        setServers(serverList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching server list:', error);
        setLoading(false);
      }
    };

    fetchServerList();
  }, []);

  return (
    <div>
      <h1>Server List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {servers.map((server, index) => (
            <li key={index}>{`Server ${index + 1}: ${server}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServerList;
