import React, { useEffect, useState } from "react";
import Chessboard from "../chessboard/Chessboard";
import Sideboard from "../sideboard/Sideboard";
import ChessboardGame from "../chessboard/ChessboardGame";

import "./style.css";
import Navigation from "../navigation/Navigation";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import OutcomeModal from "../portals/OutcomeModal";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const RESULT = {
  WHITE: "1-0", // black forfeits or black king is in checkmate
  BLACK: "0-1", // white forfeits or white king is in checkmate
  DRAW: "1/2-1/2", // stalemate, offer a draw
  UNFINISHED: "*" // internet disconnection or user closes the app or login out or a default value
};

// Source: https://www.i2symbol.com/symbols/chess
export const WHITE_CHESS_PIECE = {
  KING: "♔",
  QUEEN: "♕",
  BISHOP: "♗",
  KNIGHT: "♘",
  ROOK: "♖",
  PAWN: "♙",
};

// Source: https://www.i2symbol.com/symbols/chess
export const BLACK_CHESS_PIECE = {
  KING: "♚",
  QUEEN: "♛",
  BISHOP: "♝",
  KNIGHT: "♞",
  ROOK: "♜",
  PAWN: "♟",
};

export default function InGameView() {

  const [isNavigationClose, setIsNavigationClose] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState('w')

  const [socket, setSocket] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [result, setResult] = useState(RESULT.UNFINISHED) // default

  const PGNList = useSelector((storeState) => JSON.parse(storeState.PGNReducer.PGNOBJ))
  const [halfMove, setHalfMove] = useState(0);
  const [fullMove, setFullMove] = useState(1);

  const [players, setPlayers] = useState([]);

  //Source: https://chat.openai.com/share/82b7f010-6aa8-420c-b6f3-89e66744d516
  //Source: https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
  const { id } = useParams();
 
  const [roomId, setRoomId] = useState(id)
  const navigate = useNavigate();
  const location = useLocation();
  // const roomNumber = useSelector(storeState=>storeState.JoinRoomReducer.roomNumber);


  function handleClose() {
    console.log("line 11");
    if (isNavigationClose) {
      setIsNavigationClose(false);
    } else {
      setIsNavigationClose(true);
    }
  }

  useEffect(()=> {
    console.log("line 75");
    console.log(players);
    console.log("line 77");
    console.log(socket);
  }, [players])

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    console.log("line 200");
    setSocket(newSocket);
    newSocket.emit('join room', roomId, getUsernameFromState());

    newSocket.on('room full', () => {
      const confirmSpectator = window.confirm('The room is full. Do you want to join as a spectator?');
      if (confirmSpectator) {
        newSocket.emit('join as spectator', roomId, getUsernameFromState());
      } else {
        navigate('/');
      }
    });


    newSocket.on('player disconnected', (roomNumber) => {
      if (roomId === roomNumber) {
        alert('Opponent disconnected');
        navigate('/');
      }
    });

    newSocket.on('user list update', (userList) => {

      setPlayers(userList.players);
      console.log("line 247", userList.players);
      if (userList.spectators.length > 0) {
        console.log("line 249", userList.spectators);
      }
      if (userList.players.length === 1) {
        console.log("line 258");
        // setWhitePlayerName(userList.players[0].username)
        // if (userList.players[0].color === 'black') {
          // setOrientation('black')
        // }
      }
      if (userList.players.length === 2) {
        console.log("line 262");
        // setBlackPlayerName(userList.players[1].username)
        // if (userList.players[1].color === 'white') {
          // setOrientation('black')
        // }
      }
      // setSpectators(userList.spectators);
    });

    return () => {
      newSocket.off('moveMade');
      newSocket.disconnect();
    };
    
  }, [roomId]);

  const getUsernameFromState = () => {
    const locationState = location.state;
    console.log("line 391", locationState);
    //Cannot change from userName to playerName because it is tied to the state name and must follow what it is called.
    return locationState ? locationState.userName : '';
  };

  return (
    <>
      {isNavigationClose && (
        <>
          {/* <Navigation onClose={handleClose} /> */}
        </>
      )}
      <OutcomeModal isOpen={isModalOpen} result={result} /> 

      {/* <div className="grid grid-cols-[1fr_100fr]"> */}
      <div className="text-6xl absolute left-4 top-1">
        ≡ 
      </div>

      <div className="chessApp__page-wrapper">
      <div className="chessApp__page chessApp__page_theme">
        {/* <nav className="chessApp__nav chessApp__nav_theme">
          <ul className="chessApp__ul">
            <div className="chessApp__threeBar">
              <li onClick={handleClose}>≡</li>
            </div>
            <div className="chessApp__title">JAMDK Chess App</div>
            <div className="chessApp__timer chessApp__timer_theme">
              <li>Timer: 15:00</li>
            </div>
            <div className="chessApp__roomInfo">
              <li>Room Info: {roomNumber}</li>
            </div>
          </ul>
        </nav> */}

        {/* <div className="grid grid-cols-[1fr_100fr]"> */}
        {/* <div className="text-4xl">
          ≡
        </div> */}
        <div className="text-center text-4xl">
          In-Game Systen
        </div>
        {/* </div> */}


        <div className='chessboard__information'>
        <div>
          Turn: {activePlayer.toUpperCase()}
        </div>
        <div>
          Halfmove: {halfMove}
        </div>
        <div>
          Fullmove: {fullMove}
        </div>
        <div>
          Room Info: {roomId}
        </div>

        </div>

        <div className="chessApp__main ">
          <ChessboardGame 
            PGNList={PGNList}
            players={players}
            setPlayers={setPlayers}
            setHalfMove={setHalfMove}
            setFullMove={setFullMove}
            socket={socket}
            setSocket={setSocket} 
            roomId={roomId}
            isGameStarted={isGameStarted} 
            setIsGameStarted={setIsGameStarted}
            activePlayer={activePlayer}
            setActivePlayer={setActivePlayer}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setResult={setResult}
          />
          {/* <Chessboard /> */}
          <Sideboard type="inGame" players={players} socket={socket}/>
        </div>
      </div>
      </div>
      {/* </div> */}
    </>
  );
}
