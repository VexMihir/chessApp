import React from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import "./style.css"
export default function OutcomeModal({isOpen, result}) {

  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  let navigate = useNavigate();
  const routeChange = (e) => {
    console.log("line 10");
    e.preventDefault();
    let path = "/";
    navigate(path);
  };

  const location = useLocation()
  const blackPlayerName = location.state.blackPlayerName
  const whitePlayerName = location.state.whitePlayerName

  if (!isOpen) {
    return null
  } else {
    return ReactDOM.createPortal(
      <>
      <div className='outcomeModal outcomeModal_theme'>
        <div className='outcomeModal__main outcomeModal__main_theme'>
          <h3>Chessboard Game Outcome</h3>
          <p>Winner: {result === "1-0" ? whitePlayerName : result === "0-1" ? blackPlayerName : "None"}</p>
          <p>Result: {result === "1-0" ? result + " (White)" : result === "0-1" ? result + " (Black)" : result === "1/2-1/2" ? result + " (Draw)" : result + " (Unfinished)"}</p>
          <button onClick={routeChange}>Play Again</button>
          <button>Save PGN</button>
          <button>Review (Previous Move)</button>
        </div>
      </div>
      </>

    , document.getElementById("modal"))

  }
}
