import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loadGameDB } from '../../Redux/Action/prevGamViewActions';
import { getDBObj } from '../../Redux/Thunk/PrevGameDB';


export default function OutcomeModal({isOpen, score, result, winnerName, reason}) {

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
      <div className='fixed z-[10000] h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-black bg-[rgba(0,0,0,0.534)]'>
        <div className='p-3 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[300px] text-2xl bg-[rgb(255,255,255)] shadow'>
          <h3 className='m-0 py-2'>Game Outcome</h3>
          <div>
            <div className='flex border-[1px_solid_black] justify-around'>
              <div className='min-w-[200px]'>
                <div>{score}</div>
                <div>{result}</div>
                <div>{winnerName}</div>
              </div>

            </div>
            <div>
              {reason === "" ? "" : "Reason: " + reason 
              }
            </div>
          </div>

          {/* Source: https://v1.tailwindcss.com/components/buttons */}
          <button className="w-[120px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded" onClick={routeChange}>Back</button>
          <button className="w-[120px] text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded" onClick={navigateToMoveList}>Rewatch</button>
        </div>
      </div>
      </>

    , document.getElementById("modal"))

  }
}
