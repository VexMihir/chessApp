import React, { useState, useEffect, useRef} from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js';
import { color } from '../constants';
import Timer from './Timer';
import PastMovesPanel from './PastMovesPanel.jsx'

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
  const [moveHistory, setMoveHistory] = useState([]);

  // UI Related data
  const [boardHeight, setBoardHeight] = useState(0);
  const chessboardRef = useRef(null);

  useEffect(() => {
    if (chessboardRef.current) {
      setBoardHeight(chessboardRef.current.clientHeight);
    }
  }, []);

  const connectToServerSocket = () => {
    // timeout as mock socket.io connect for 1 second
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // if the move was successful, return true
  const movePieceFromSourceToTarget = ({ sourceSquare, targetSquare }) => {
    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare
      });
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  const handleDrop = ({ sourceSquare, targetSquare }) => {
    if (movePieceFromSourceToTarget({ sourceSquare, targetSquare })) {
      setFen(chess.fen());
      setMoveHistory(chess.history());
    }
  };
   

  useEffect(() => {
    connectToServerSocket();
  }, []); 

  const renderInfo = (time, username) => (
    <div className="flex items-center justify-between w-full my-1.5">
      <div className="text-white">{username}</div>
      <Timer timeInSeconds={time} />
    </div>
  );  
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row bg-transparent items-center">
        <div className="flex flex-col items-center pr-10" ref={chessboardRef}>
          {renderInfo(timeForWhite, usernameForWhite)}
          <Chessboard
            position={fen}
            orientation={orientation}
            darkSquareStyle={{ backgroundColor: '#3F72AF' }}
            lightSquareStyle={{ backgroundColor: '#F9F7F7' }}
            onDrop={handleDrop}
          />
          {renderInfo(timeForBlack, usernameForBlack)}
        </div>
        <PastMovesPanel moves={moveHistory} height={boardHeight} />
      </div>
      {isLoading && <div className="text-white mt-4">Loading...</div>}
    </div>
  );
};

export default LiveGameView;
