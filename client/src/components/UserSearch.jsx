import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const UserSearch = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async (steamUserId) => {
    setLoading(true);
    const res = await axios.get(`/api/steam/user/${steamUserId}`);
    setUser(res.data.player);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/steam/${search}`);
    const steamUserId = res.data.steamId;
    fetchUser(steamUserId);
    setSearch("");
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 m-auto bg-secondary nm-convex-secondary-sm">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for a user"
          className="w-full p-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-0"
        />

        <button
          type="submit"
          className="flex items-center justify-center w-full p-2 mt-2 text-white  border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 nm-concave-primary-sm hover:nm-inset-primary-sm"
        >
          <Icon icon="ph:magnifying-glass-duotone" className="w-5 h-5 mr-2 drop-shadow-md" />
       
          <p className="drop-shadow-md">Search</p>
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center w-full h-20">
          <Icon icon="eos-icons:bubble-loading" className="w-10 h-10 text-accent animate-spin" />
          <p className="ml-2 text-accent">Loading...</p>
        </div>
      ) : user ? (
        <div className="flex flex-col items-center justify-center w-full p-4 mt-2 text-white bg-secondary nm-convex-secondary-sm">
          <div className="flex items-center justify-center mb-2">
            <img
              src={user.avatarfull}
              alt="User avatar"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="ml-2 text-xl font-semibold">{user.personaname}</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <h2 className="text-lg font-semibold">User Information:</h2>
            <ul className="mt-2 text-sm">
              <li className="my-1">
                <strong>Steam ID:</strong> {user.steamid}
              </li>
              <li className="my-1">
                <strong>Real Name:</strong>{" "}
                {user.realname ? user.realname : "N/A"}
              </li>
              <li className="my-1">
                <strong>Country:</strong>{" "}
                {user.loccountrycode ? user.loccountrycode : "N/A"}
              </li>
              <li className="my-1">
                <strong>State:</strong> {user.locstatecode ? user.locstatecode : "N/A"}
              </li>
              <li className="my-1">
                <strong>City:</strong> {
                  user.loccityid ? user.loccityid : "N/A"
                }
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-20">

          <p className="text-gray-500">No user found</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
