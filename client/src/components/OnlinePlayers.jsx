import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

const OnlinePlayers = ({ count, appName }) => {
  return (
    <div className="flex items-center justify-center">
      {count !== null ? (
        <div className=" flex items-center justify-center">

          <p className="text-sm font-medium animate-pulse text-green-400">{count}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Icon
            className="text-gray-600 animate-pulse text-2xl"
            icon="svg-spinners:bars-scale-middle"
          />
        </div>
      )}
      <p className="ml-2 text-green-400 drop-shadow-sm text-sm">Online Players</p>
      <div className="flex items-center justify-center">
        <p className="ml-2 text-green-400 drop-shadow-sm text-sm">{appName}</p>
        </div>
    </div>
  );
};

OnlinePlayers.propTypes = {
  count: PropTypes.number,
  appName: PropTypes.string.isRequired, // Add appName prop type
};

export default OnlinePlayers;
