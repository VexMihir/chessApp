import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loadGameDB } from '../../Redux/Action/prevGamViewActions';
import { getDBObj } from '../../Redux/Thunk/PrevGameDB';
import { normalView, queryPage } from '../../RouteString/RouteString';
import { SocketContext } from '../../context/socket';

export default function OutcomeModal({isOpen, score, result, winnerName, reason}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function navigateToMoveList(e) {
   e.preventDefault();
   dispatch(loadGameDB(0));
   navigate(queryPage, {replace: false})
  }

  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  const routeChange = (e) => {
    e.preventDefault();
    let path = "/roomAssignment/playerForm";
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
      <div className='fixed z-[10000] h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-red-600 bg-[rgba(0,0,0,0.534)]'>
        <div className='p-3 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[350px] text-2xl bg-custom-cream shadow rounded-md'>
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


          <>
          {/* Source: https://v1.tailwindcss.com/components/buttons */}
            <button className="w-auto text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded" onClick={routeChange}>Back</button>
            <button className="w-auto text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded" onClick={navigateToMoveList}>Game List</button>
          </>

          

        </div>
      </div>
      </>

    , document.getElementById("modal"))

  }
}
