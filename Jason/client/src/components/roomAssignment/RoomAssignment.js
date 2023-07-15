import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./style.css";
import InGameView from "../inGameView/InGameView";
import PreviousGameView from "../previousGameView/PreviousGameView";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchData } from "../../Redux/Reducers/Room_Num_Reducers";


export default function RoomAssignment() {
  const [roomId, setRoomId] = useState();
  const [playerName, setPlayerName] = useState();


  const dispatch = useDispatch();
  const roomNums = useSelector((state) => state.Room_Num_Reducer.Room_Num)

  // const [whitePlayerName, setWhitePlayerName] = useState();

  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  let navigate = useNavigate();
  const routeChange = (e) => {
    console.log("line 10");
    e.preventDefault();
    let path = "/inGameView";
    navigate(path, {state: {roomId,playerName}});
  };

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get('http://localhost:5001/createGame');
      // console.log("line 31", response);
      // if (response.data && response.data.roomNumber) {
        // let roomId = response.data.roomNumber
        
      //   navigate(`/${response.data.roomNumber}`, { state: { roomId, playerName } }); // Pass username in state
      // }

      navigate(`/${roomId}`, { state: { roomId, playerName } }); // Pass username in state
    } catch (error) {
      console.error(error);
    }
  };

  const createRoom2 = async (e) => {
    e.preventDefault();
    try {
      dispatch(fetchData('http://localhost:5001/createGamePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }))
      // const response = await axios.get('http://localhost:5001/createGame');
      // console.log("line 31", response);
      // if (response.data && response.data.roomNumber) {
        // let roomId = response.data.roomNumber
        
      //   navigate(`/${response.data.roomNumber}`, { state: { roomId, playerName } }); // Pass username in state
      // }

      // navigate(`/${roomId}`, { state: { roomId, playerName } }); // Pass username in state
    } catch (error) {
      console.error(error);
    }
  };

  // const joinRoom = () => {
  //   navigate(`/${roomNumber}`, { state: { username } }); // Pass username in state
  // };

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
              <label className="roomAssign__label"> Player Name:</label>{" "}
              <input type="text" className="roomAssign__input" onChange={(e) => setPlayerName(e.target.value)}/>
            </div>
            {/* <div className="roomAssign__column">
              <label className="roomAssign__label">White Player Name:</label>{" "}
              <input type="text" className="roomAssign__input" onChange={(e) => setWhitePlayerName(e.target.value)}/>
            </div> */}

            <button onClick={createRoom} className="roomAssign__button">
              Join Room
            </button>
            <button onClick={createRoom2} className="roomAssign__button">
              Create Room Num
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
