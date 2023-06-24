import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./style.css";
import InGameView from "../inGameView/InGameView";
import PreviousGameView from "../previousGameView/PreviousGameView";

export default function RoomAssignment() {
  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  let navigate = useNavigate();
  const routeChange = (e) => {
    console.log("line 10");
    e.preventDefault();
    let path = "/inGameView";
    navigate(path);
  };

  return (
      <>
        <div className="roomAssign__page">
          <h1 className="roomAssign__title">JAMDK Chess</h1>
          <form className="roomAssign__form">
            <div className="roomAssign__row">
              <div className="roomAssign__column">
                <label className="roomAssign__label">Room ID:</label>{" "}
                <input type="text" className="roomAssign__input" />
              </div>
              <div className="roomAssign__column">
                <label className="roomAssign__label"> Player1 Name:</label>{" "}
                <input type="text" className="roomAssign__input" />
              </div>
              <div className="roomAssign__column">
                <label className="roomAssign__label">Player2 Name:</label>{" "}
                <input type="text" className="roomAssign__input" />
              </div>
              <div className="roomAssign__column">
                <label className="roomAssign__label">Room Number:</label>
                <select className="roomAssign__select">
                  <option>Room 1</option>
                  <option>Room 2</option>
                  <option>Room 3</option>
                  <option>Room 4</option>
                  <option>Room 5</option>
                </select>
              </div>

              <button onClick={routeChange} className="roomAssign__button">
                Join Room
              </button>
            </div>
          </form>
        </div>
      </>
  );
}