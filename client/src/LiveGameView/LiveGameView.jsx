import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { color } from '../constants';
import ChessboardPanel from './ChessboardPanel.jsx'
import SidePanel from './SidePanel.jsx'

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

  // Resign functionality
  const onResign = () => {
    console.log("Resigned")
  }

  // Offer draw functionality
  const onOfferDraw = () => {
    console.log("Offered draw")
  }


  useEffect(() => {
    if (chessboardRef.current) {
      setBoardHeight(chessboardRef.current.clientHeight);

      const resizeObserver = new ResizeObserver(() => {
        setBoardHeight(chessboardRef.current.clientHeight);
      });

      resizeObserver.observe(chessboardRef.current);

      // Cleanup function for the effect
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [chessboardRef]);


  useEffect(() => {
    connectToServerSocket();
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
      chess.move({
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row bg-transparent items-center" ref={chessboardRef}>
        <ChessboardPanel
          timeForWhite={timeForWhite}
          timeForBlack={timeForBlack}
          usernameForWhite={usernameForWhite}
          usernameForBlack={usernameForBlack}
          orientation={orientation}
          fen={fen}
          handleDrop={handleDrop}
        />
        <SidePanel
          moves={moveHistory}
          height={boardHeight}
          onResign={onResign}
          onOfferDraw={onOfferDraw}
        />
      </div>
      {isLoading && <div className="text-white mt-4">Loading...</div>}
    </div>
  );
};

export default LiveGameView;
