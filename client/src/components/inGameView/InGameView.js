import React, { useEffect, useState } from "react";
import Chessboard from "../chessboard/Chessboard";
import Sideboard from "../sideboard/Sideboard";
import ChessboardGame from "../chessboard/ChessboardGame";

import "./style.css";
import Navigation from "../navigation/Navigation";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OutcomeModal from "../portals/OutcomeModal";

export const RESULT = {
  WHITE: "1-0", // black forfeits or black king is in checkmate
  BLACK: "0-1", // white forfeits or white king is in checkmate
  DRAW: "1/2-1/2", // stalemate, offer a draw
  UNFINISHED: "*" // internet disconnection or user closes the app or login out or a default value
};

export default function InGameView() {

  const [isNavigationClose, setIsNavigationClose] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState('w')

  const [socket, setSocket] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [result, setResult] = useState(RESULT.UNFINISHED) // default

  //Source: https://chat.openai.com/share/82b7f010-6aa8-420c-b6f3-89e66744d516
  //Source: https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
  const { id } = useParams();
 
  const [roomNumber, setRoomNumber] = useState(id)
  // const roomNumber = useSelector(storeState=>storeState.JoinRoomReducer.roomNumber);


  function handleClose() {
    console.log("line 11");
    if (isNavigationClose) {
      setIsNavigationClose(false);
    } else {
      setIsNavigationClose(true);
    }
  }
  return (
    <>
      {isNavigationClose && (
        <>
          {/* <Navigation onClose={handleClose} /> */}
        </>
      )}
      <OutcomeModal isOpen={isModalOpen} result={result} /> 
      <div className="chessApp__page chessApp__page_theme">
        <nav className="chessApp__nav chessApp__nav_theme">
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
        </nav>
        <div className="chessApp__main ">
          <ChessboardGame 
            socket={socket}
            setSocket={setSocket} 
            roomId={roomNumber}
            isGameStarted={isGameStarted} 
            setIsGameStarted={setIsGameStarted}
            activePlayer={activePlayer}
            setActivePlayer={setActivePlayer}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setResult={setResult}
          />
          {/* <Chessboard /> */}
          {/* <Sideboard type="inGame" /> */}
        </div>
      </div>
    </>
  );
}
