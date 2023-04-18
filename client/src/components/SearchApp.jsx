import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import SearchResult from "./SearchResults";



const SearchApps = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");



  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleSearch = debounce(async () => {
    setLoading(true);
    try {
      clearTimeout(timeoutId);
      const response = await axios.get(`/api/search?q=${searchTerm}`);
      const appData = response.data.map((app) => ({
        name: app.name,
        appId: app.appid,
        onlinePlayers: app.player_count,
      }));
      setResults(appData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, 1000);

  const handleSelect = (appId, appName, onlinePLayers) => {
    props.onSelect(appId, appName, onlinePLayers);
    setSearchTerm("");
    setResults([]);
    return {
      appId,
      name: appName,
      onlinePlayers: onlinePLayers
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <span className="text-gray-600 animate-pulse text-xs text-center">
          Searching Steam for "{searchTerm}"
        </span>
        <Icon
          className="text-gray-600 animate-pulse text-2xl"
          icon="svg-spinners:bars-scale-middle"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex items-center justify-center w-full flex-col p-2">
        <input
          className="text-white rounded-md nm-inset-secondary-sm hover:nm-inset-secondary-sm cursor-pointer w-full focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search apps"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

        <button
          className=" text-center mt-2 w-full inline-flex  border border-transparent shadow-sm text-sm font-medium rounded-md text-white nm-convex-indigo-sm nm-flat-indigo-600-xs p-2 hover:nm-inset-indigo-700-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSearch}
        >
          <p className="m-auto"> Search</p>
        </button>
      </div>


      <div className="flex flex-col items-center justify-center w-full h-full">
        {results.length > 0 && (
          <SearchResult
            results={results}
            onSelect={handleSelect}
            setSearchTerm={setSearchTerm}
          />
        )}

        {results.length > 0 && (
          <p
            className="text-accent text-center text-xs p-2"
          >
            results found: {results.length}
          </p>
        )}
      </div>
    </div>
  );
};
export default SearchApps;