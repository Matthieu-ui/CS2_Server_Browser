import React from 'react';

function GamesList({ games }) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <h3 className="text-lg font-semibold">Games</h3>
        <ul className="flex flex-col items-center justify-center w-full mt-2">
          {games.map(game => (
            <li key={game.appid} className="w-full p-2 text-center border border-gray-300 rounded-md">
              {game.name}
              {game.playtime_forever > 0 && (
                <p className="text-xs text-gray-500">
                  {game.playtime_forever} minutes played
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default GamesList;
  