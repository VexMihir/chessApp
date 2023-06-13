import React, { useState } from "react";
import Chessboard from "../chessboard/Chessboard";
import Sideboard from "../sideboard/Sideboard";
import "./style.css";
import Navigation from "../navigation/Navigation";

export default function PreviousGameView() {
  const currIndx = useSelector()
  const [isNavigationClose, setIsNavigationClose] = useState(true);

  function handleClose() {
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
            <div></div>
            <div className="chessApp__roomInfo">
              <li>Room Info: 10</li>
            </div>
          </ul>
        </nav>
        <div className="chessApp__main ">
          <Chessboard />
          <Sideboard type={"previous"} />
        </div>
      </div>
    </>
  );
}
