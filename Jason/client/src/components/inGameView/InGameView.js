import React, { useState } from "react";
// import Chessboard from "../chessboard/Chessboard";
import Sideboard from "../sideboard/Sideboard";

import "./style.css";
import Navigation from "../navigation/Navigation";
import ChessboardGame from "../chessboard/ChessboardGame";
import OutcomeModal from "../portals/OutcomeModal";
import { useLocation } from "react-router-dom";


export const RESULT = {
  WHITE: "1-0", // black forfeits or black king is in checkmate
  BLACK: "0-1", // white forfeits or white king is in checkmate
  DRAW: "1/2-1/2", // stalemate, offer a draw
  UNFINISHED: "*" // internet disconnection or user closes the app or login out or a default value
};

export default function InGameView() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [result, setResult] = useState(RESULT.UNFINISHED) // default
  const [activePlayer, setActivePlayer] = useState("w")

  const [socket, setSocket] = useState(null)

  //Source: https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
  const location = useLocation();
  const roomId = location.state.roomId

  function handleClose() {
    if (isNavigationOpen) {
      setIsNavigationOpen(false);
    } else {
      setIsNavigationOpen(true);
    }
  }

  return (
    <>
      {isNavigationOpen && (
        <>
          <Navigation onClose={handleClose} />
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
            <div className="chessApp__roomInfo">
              <li>Room Info: {roomId}</li>
            </div>
          </ul>
        </nav>
        <div className="chessApp__main ">
          <ChessboardGame
          socket={socket}
          setSocket={setSocket} 
          roomId={roomId}
          isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setResult={setResult} activePlayer={activePlayer} setActivePlayer={setActivePlayer}/>
          <Sideboard type="inGame" 
          socket={socket}
          setIsGameStarted={setIsGameStarted} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setResult={setResult} activePlayer={activePlayer}/>
        </div>
      </div>
    </>
  );
}
