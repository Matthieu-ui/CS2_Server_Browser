import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const OnlinePlayers = () => {
  const [peakPlayersCount, setPeakPlayersCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/stats')
              .then((response) => {
        setOnlinePlayersCount(response.data.response.player_count);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Icon icon="eos-icons:three-dots-loading"
    className="text-white text-2xl w-10 h-10 text-center"
    />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-white text-2xl font-medium p-2">
        players online: {onlinePlayersCount}
      </h1>
    </div>
  );
};

export default OnlinePlayers;
