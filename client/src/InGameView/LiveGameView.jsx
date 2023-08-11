import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js';
import InfoPanel from './InfoPanel';
import { color } from '../constants';

const LiveGameView = () => {
  const [isLoading, setIsLoading] = useState(true);

  // User related data
  const [timeForWhite, setTimeForWhite] = useState(231);
  const [timeForBlack, setTimeForBlack] = useState(190);
  const [usernameForWhite, setUserNameWhite] = useState("user_white");
  const [usernameForBlack, setUserNameBlack] = useState("user_black");
  const [orientation, setOrientation] = useState(color.WHITE);
  
  // Chess logic related data
  const [chess] = useState(new Chess()); // create a new chess.js instance
  const [fen, setFen] = useState(chess.fen()); // use FEN for board position

  const connectToServerSocket = () => {
    // timeout as mock socket.io connect for 1 second
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare
    });

    if (move) setFen(chess.fen());
  };

  useEffect(() => {
    connectToServerSocket();
  }, []); 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row items-center">
        <div className="bg-sky-950 border-2 border-gray-500 p-3 rounded-lg shadow-lg">
          <Chessboard
            position={fen}
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
