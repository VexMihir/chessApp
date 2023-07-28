import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import "./style.css"
import { useDispatch } from 'react-redux';
import { loadGameDB } from '../../Redux/Action/prevGamViewActions';
import { getDBObj } from '../../Redux/Thunk/PrevGameDB';


export default function OutcomeModal({isOpen, result}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  function navigateToMoveList(e) {
   e.preventDefault();
   dispatch(loadGameDB(0));
   navigate("/prevMoveList", {replace: false})
  }



  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  const routeChange = (e) => {
    console.log("line 10");
    e.preventDefault();
    let path = "/";
    navigate(path);
  };

  const location = useLocation()
  const blackPlayerName = location.state.blackPlayerName
  const whitePlayerName = location.state.whitePlayerName

  let flag = false;


  useEffect( () => {
      if (flag) return;
      dispatch(getDBObj());
      return (
          () => {
              flag = true;
          }
      )
  }, [])

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
          <button onClick={routeChange}>Back</button>
          <button onClick={navigateToMoveList}>Rewatch</button>
        </div>
      </div>
      </>

    , document.getElementById("modal"))

  }
}
