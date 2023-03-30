import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

function UserSearch() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [steamUserId, setSteamUserId] = useState(null);
  const [showGames, setShowGames] = useState(false);
  const [sortOption, setSortOption] = useState("name");


  useEffect(() => {
    async function fetchData() {
      if (!steamUserId) {
        return;
      }
  
      setLoading(true);
  
      try {
        const [userRes, gamesRes] = await Promise.all([
          axios.get(`/api/steam/user/${steamUserId}`),
          axios.get(`/api/steam/user/games/${steamUserId}`)
        ]);
  
        setUser({
          ...userRes.data.player,
          games: gamesRes.data.games
        });
      } catch (error) {
        console.error(error);
      }
  
      setLoading(false);
    }
  
    fetchData();
  }, [steamUserId, sortOption]);

  async function handleSearch(e) {
    e.preventDefault();
    const res = await axios.get(`/api/steam/${search}`);
    const steamUserId = res.data.steamId;
    setSteamUserId(steamUserId);
    setSearch("");
  }

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function handleViewGames(e) {
    e.preventDefault();
    setShowGames(true);
  }

    function handleSort(e) {
    e.preventDefault();
    const sortedGames = [...user.games];
    switch (sortOption) {
      case "time-desc":
        sortedGames.sort((a, b) => b.playtime_forever - a.playtime_forever);
        break;
      case "time-asc":
        sortedGames.sort((a, b) => a.playtime_forever - b.playtime_forever);
        break;
      case "name-desc":
        sortedGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "name-asc":
      default:
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    setUser({
      ...user,
      games: sortedGames
    });
  }





  return (
    <div className="flex flex-col items-center justify-center p-4 m-auto bg-primary nm-convex-secondary-sm">
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
        <div>
          <div className="flex flex-col items-center justify-center w-full">

            <img src={user.avatarfull} alt={user.personaname} className="w-20 h-20 mt-2 rounded-full m-3 drop-shadow-sm" />
            <h2 className="text-xl font-semibold m-3">{user.personaname}</h2>
            <p>Steam ID: {user.steamid}</p>

            <p>Location: {user.loccountrycode || "N/A"}</p>
            <a className="text-accent hover:underline" href={user.profileurl} target="_blank" rel="noreferrer">Visit Profile</a>
            <p className="text-sm text-gray-500">Account created: {new Date(user.timecreated * 1000).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Last Login: {new Date(user.lastlogoff * 1000).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Status: {user.personastate === 0 ? "Offline" : "Online"}</p>
            <p className="text-sm text-gray-500">Privacy: {user.communityvisibilitystate === 1 ? "Private" : "Public"}</p>
            <p className="text-sm text-gray-500">Profile State: {user.profilestate === 1 ? "Active" : "Inactive"}</p>
            <p className="text-sm text-gray-500">VAC Ban: {user.vacbanned ? "Banned" : "None"}</p>
            <p className="text-sm text-gray-500">most played game: {user.games[0].name}</p>

            <p className="text-sm text-gray-500">total playtime: {user.games.reduce((acc, game) => acc + game.playtime_forever, 0)}</p>
            <p className="text-sm text-gray-500">total games: {user.games.length}</p>
      

          





          </div>

          {showGames ? (
            <div className="flex flex-col items-center justify-center w-full mt-4">
              <h3 className="text-lg font-semibold">Game Library</h3>
              <p className="text-sm font-medium text-gray-500">{user.games.length} games found</p>

              <div className="flex flex-col w-full mt-4 max-h-80 nm-convex-secondary-lg p-4 overflow-auto">
                <h3 className="text-lg text-center font-semibold p-1">Sort games</h3>
     
                <select
                className="w-full p-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-0 nm-inset-white-sm"
                value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="time-asc">Least Time Played</option>
                <option value="time-desc">Most Time Played</option>
              </select>
              
              <button className="flex items-center justify-center w-full p-2 mt-2 text-white  border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 nm-concave-primary-sm hover:nm-inset-primary-sm" onClick={handleSort}>Sort</button>
  
            

              </div>


              <ul className="flex flex-col  w-full mt-4 max-h-80 nm-inset-secondary-lg border border-gray-100 rounded-lg border-opacity-40 p-4 overflow-auto">
                {user.games.map(game => (
                  <li
                    key={game.appid}
                    className="w-full p-2 text-center border border-gray-300 rounded-md  m-1 "
                  >
                    {game.name}
                    {game.playtime_forever > 0 && (
                      <p className="text-xs text-accent">
                        {game.playtime_forever} minutes played
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              onClick={handleViewGames}

              className="flex items-center justify-center w-full p-2 mt-2 text-white  border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 nm-concave-primary-sm hover:nm-inset-primary-sm"
            >

              <Icon icon="ic:outline-visibility" className="w-5 h-5 mr-2 drop-shadow-md" />

              <p className="drop-shadow-md">View Games</p>
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserSearch;
