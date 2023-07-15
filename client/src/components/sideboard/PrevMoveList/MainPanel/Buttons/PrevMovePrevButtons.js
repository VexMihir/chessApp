import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {indiPieceUpdate, pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function PrevMovePrevButton() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.PGNReducer)
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
      <button className="bg-white hover:bg-violet-900 active:shadow-violet-950
        py-2 px-4 border border-gray-400 rounded"
        onClick={(e) => {
          handlePrev(e);
        }}
        disabled={prevDisability}
      ><FontAwesomeIcon icon={faCaretLeft} size={"xl"} alignmentBaseline={"central"}/></button>
  )
}
