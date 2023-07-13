import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./style.css";
import InGameView from "../inGameView/InGameView";
import PreviousGameView from "../previousGameView/PreviousGameView";
import { useState } from "react";

export default function RoomAssignment() {
  const [roomId, setRoomId] = useState();
  const [blackPlayerName, setBlackPlayerName] = useState();
  const [whitePlayerName, setWhitePlayerName] = useState();

  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  let navigate = useNavigate();
  const routeChange = (e) => {
    console.log("line 10");
    e.preventDefault();
    let path = "/inGameView";
    navigate(path, {state: {roomId,blackPlayerName, whitePlayerName}});
  };

  return (
    <>
      <div className="roomAssign__page">
        <div className="roomAssign__main">
        <h1 className="roomAssign__title">JAMDK Chess</h1>
        <form className="roomAssign__form">
          <div className="roomAssign__row">
            <div className="roomAssign__column">
              <label className="roomAssign__label">Room ID:</label>{" "}
              <input type="text" className="roomAssign__input" onChange={(e) => setRoomId(e.target.value)}/>
            </div>
            <div className="roomAssign__column">
              {/* It should be supposed to have only one field here since we have no idea who would be our opponent */}
              {/* for now, 2 fields */}
              <label className="roomAssign__label"> Black Player Name:</label>{" "}
              <input type="text" className="roomAssign__input" onChange={(e) => setBlackPlayerName(e.target.value)}/>
            </div>
            <div className="roomAssign__column">
              <label className="roomAssign__label">White Player Name:</label>{" "}
              <input type="text" className="roomAssign__input" onChange={(e) => setWhitePlayerName(e.target.value)}/>
            </div>

            <button onClick={routeChange} className="roomAssign__button">
              Join Room
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
