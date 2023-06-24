import React, { useState } from "react";
import Chessboard from "../chessboard/Chessboard";
import Sideboard from "../sideboard/Sideboard";

import "./style.css";
import Navigation from "../navigation/Navigation";

export default function InGameView() {

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  function handleClose() {
    console.log("line 11");
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
      <div className="chessApp__page chessApp__page_theme">
        <nav className="chessApp__nav chessApp__nav_theme">
          <ul className="chessApp__ul">
            <div className="chessApp__threeBar">
              <li onClick={handleClose}>≡</li>
            </div>
            <div className="chessApp__title">JAMDK Chess App</div>
            <div className="chessApp__roomInfo">
              <li>Room Info: 10</li>
            </div>
          </ul>
        </nav>
        <div className="chessApp__main ">
          <Chessboard />
          <Sideboard type="inGame" />
        </div>
      </div>
    </>
  );
}
