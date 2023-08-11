import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import InfoPanel from './InfoPanel';
import { color } from '../constants';

const LiveGameView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeForWhite, setTimeForWhite] = useState(231);
  const [timeForBlack, setTimeForBlack] = useState(190);
  const [orientation, setOrientation] = useState(color.WHITE);
  const [usernameForWhite, setUserNameWhite] = useState("user_white");
  const [usernameForBlack, setUserNameBlack] = useState("user_black");

  const connectToServerSocket = () => {
    // timeout as mock socket.io connect for 1 second
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDrop = ({ sourceSquare, targetSquare }) => {
    console.log(`Moved piece from ${sourceSquare} to ${targetSquare}`);
  };

  

  useEffect(() => {
    connectToServerSocket(); // Call the function when the component mounts
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row items-center">
        <div className="bg-sky-950 border-2 border-gray-500 p-3 rounded-lg shadow-lg">
          <Chessboard
            position="start"
            orientation={orientation}
            darkSquareStyle={{ backgroundColor: '#3F72AF' }}
            lightSquareStyle={{ backgroundColor: '#F9F7F7' }}
            onDrop={handleDrop}
          />
        </div>
        <InfoPanel
          orientation={orientation}
          timeForWhite={timeForWhite}
          timeForBlack={timeForBlack}
          usernameForWhite={usernameForWhite}
          usernameForBlack={usernameForBlack}
        />
      </div>
      {isLoading && <div className="text-white mt-4">Loading...</div>}
    </div>
  );
};

export default LiveGameView;
