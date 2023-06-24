import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {indiPieceUpdate, pauseMoveList} from "../../../../Redux/Action/PGN_Actions";

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
      <button
        id={"PrevButtonP"}
        onClick={(e) => {
          handlePrev(e);
        }}
        disabled={prevDisability}
      >PREV</button>
  );
}
