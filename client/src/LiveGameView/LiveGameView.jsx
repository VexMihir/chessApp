import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { color } from '../constants';
import ChessboardPanel from './ChessboardPanel.jsx'
import SidePanel from './SidePanel.jsx'
import { io } from 'socket.io-client';
import { EVENTS } from "../socket/aliases"

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

  // Socket related data
  const socketRef = useRef();

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

    return () => {
      socketRef.current && socketRef.current.disconnect();
    };
  }, []);

  const connectToServerSocket = () => {
    console.log("running connectToServerSocket")
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001');
    socketRef.current.on('connect', () => {
      console.log('Connected to the server!');
      const roomNumber = window.location.pathname.split('/')[2];
      const username = "some_user"; 
      socketRef.current.emit(EVENTS.JOIN_ROOM, roomNumber, username);
      console.log("Emitted joinRoom")
    });
    
    socketRef.current.on(EVENTS.USER_LIST_UPDATE, (userList) => {
      console.log('Received user list:', userList);
      
      // Assuming the server sends an array of players, and each player has an `username` and `color` property
      userList.players.forEach(player => {
        if (player.color === color.WHITE) {
          setUserNameWhite(player.username);
        } else if (player.color === color.BLACK) {
          setUserNameBlack(player.username);
        }
      });
    });

     // Handle the other events emitted by the server. These handlers are just examples:
  socketRef.current.on(EVENTS.START_GAME, () => {
    console.log('The game has started!');
    // Implement any other logic you want here...
  });

  socketRef.current.on(EVENTS.ROOM_FULL, (room) => {
    console.log(`Room ${room} is full!`);
    // Inform the user that the room is full or handle as necessary
  });

  socketRef.current.on(EVENTS.ROOM_NOT_EXIST, () => {
    console.log('This room does not exist.');
    // Inform the user that the room does not exist or handle as necessary
  });


    socketRef.current.on()

    setIsLoading(false);
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
