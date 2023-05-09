import React from "react";
//generate unique id for each search result
import { v4 as uuidv4 } from "uuid";


const SearchResult = ({
  results,
  onSelect,
  setSearchTerm,

}) => {



  
  const handleClick = async (appId, name) => {
    try {
      const response = await fetch(`/api/stats/${appId}`);
      const data = await response.json();
      const onlinePlayers = data.response.player_count;
      onSelect(appId, name, onlinePlayers); // update selected app ID, name, and player count for 

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full">
    
      <div className=" mx-auto p-2">
        <input
          className="hidden text-white rounded-md nm-inset-secondary-sm hover:nm-inset-secondary-lg cursor-pointer w-full focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search apps"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {results.length > 0 && (
          <select className="
          w-full text-white rounded-md
          nm-convex-secondary-lg m-1 p-2 focus:outline-none focus:ring focus:ring-accent " onChange={(e) => handleClick(e.target.value, e.target.selectedOptions[0].text)}>
            <option
            className=" text-black
            bg-gray-500
            nm-concave-secondary-sm m-1 p-2 w-full"
            value="0">Select Result</option>

            {results.slice(0, 25).map((result) => (
              <option
              className=" text-black nm-concave-secondary-lg m-1 p-2 w-full"
              key={uuidv4()} value={result.appId}>
                {result.name} 
              </option>
            ))}
    
          </select>

        )}
      </div>
    </div>
  );
};
export default SearchResult;
