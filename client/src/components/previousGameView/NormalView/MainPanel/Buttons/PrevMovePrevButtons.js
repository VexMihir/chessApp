/**  Button to go back a move in the replay in the previous game view. 
 * Make uses of redux reducers to parse through the moves.
*/

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {indiPieceUpdate, pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function PrevMovePrevButton() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.PrevGameView)
    const currIdx = state.currIdx;
    const [prevDisability, setPrevDisability] = useState(true);
    const prevMoveListObj = JSON.parse(state.PGNOBJ).prevMoveListFEN

  function handlePrev(e) {
      e.preventDefault();
      dispatch(pauseMoveList(true))
      dispatch(indiPieceUpdate(-1))
  }

  useEffect(() => {
      if (currIdx > 0) {
          setPrevDisability(false)
      } else {
          setPrevDisability(true)
      }

  }, [prevMoveListObj])


  return (
      <button className="bg-transparent hover:bg-custom-pale active:shadow-custom-pale py-2 px-4 rounded shadow shadow-white shadow-md"
        onClick={(e) => {
          handlePrev(e);
        }}
        disabled={prevDisability}
      ><FontAwesomeIcon icon={faCaretLeft} color={"white"} size={"l"} alignmentBaseline={"central"}/></button>
  )
}
