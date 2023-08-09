import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadGameDB } from "../../Redux/Action/prevGamViewActions";
import { getDBObj } from "../../Redux/Thunk/PrevGameDB";
import { queryPage } from "../../RouteString/RouteString";
/*
  A component for OutcomeModal
  1. It can display the corresponding information for the game scores, winner color, winenr name, reason to win the game
  2. The score can be 1-0(White), 0-1(Black), or 1/2-1/2(Draw)
  3. The color can be white or black
  4. The winner name is username
  5. The reason to win this game can be the player is checkmated, the player forfeitd, the player accepted the draw offer, the both players were in stalemate.
  6. There are 2 buttons for this modal: 1. Back button and 2. Game List button
  7. The back button allows user go back to home page
  8. The game list button allows user visit the component where it shows a list of game history information. 
  Technologies: React, Tailwind CSS
*/
export default function OutcomeModal({
  isOpen,
  score,
  result,
  winnerName,
  reason,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function navigateToMoveList(e) {
    e.preventDefault();
    dispatch(loadGameDB(0));
    navigate(queryPage, { replace: false });
  }

  //Source: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  const routeChange = (e) => {
    e.preventDefault();
    let path = "/";
    navigate(path);
  };

  let flag = false;

  useEffect(() => {
    if (flag) return;
    dispatch(getDBObj());
    return () => {
      flag = true;
    };
  }, []);

  if (!isOpen) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <>
        <div className="fixed z-[10000] h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-red-600 bg-[rgba(0,0,0,0.534)]">
          <div className="p-3 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[350px] text-2xl bg-custom-cream shadow rounded-md">
            <h3 className="m-0 py-2">Game Outcome</h3>
            <div>
              <div className="flex border-[1px_solid_black] justify-around">
                <div className="min-w-[200px]">
                  <div>{score}</div>
                  <div>{result}</div>
                  <div>{winnerName}</div>
                </div>
              </div>
              <div>{reason === "" ? "" : "Reason: " + reason}</div>
            </div>

            <>
              {/* Source: https://v1.tailwindcss.com/components/buttons */}
              <button
                className="w-auto text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded"
                onClick={routeChange}
              >
                Back
              </button>
              <button
                className="w-auto text-2xl bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black py-1 px-3 mx-2 rounded-md rounded"
                onClick={navigateToMoveList}
              >
                Game List
              </button>
            </>
          </div>
        </div>
      </>,

      document.getElementById("modal")
    );
  }
}
