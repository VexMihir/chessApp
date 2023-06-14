import {indiPieceUpdate} from "../../../Redux/Action/PGN_Actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

export function PrevListMoveButtons() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.PGNReducer)
    const currIdx = state.currIdx;
    const [nextDisability, setNextDisability] = useState(true);
    const [prevDisability, setPrevDisability] = useState(true);
    const [count, setCount] = useState(0)
    const prevMoveListObj = JSON.parse(state.PGNOBJ).prevMoveListFEN

  function handlePrev(e) {
      e.preventDefault();
      dispatch(indiPieceUpdate(-1))
  }

  function handleNext(e) {
    e.preventDefault();
    highlightPara();
    dispatch(indiPieceUpdate(1));
    setCount((prevState) => prevState +1);
  }

  function highlightPara() {
      if (count === 0) {
          let obj = document.getElementById((currIdx)+"P1");
          obj.style.backgroundColor = "yellow"
          return;
      }
       if (count % 2 === 0 && count !== 0)  {
           let obj = document.getElementById((currIdx-2)+ "P2")
           obj.style.backgroundColor = "white"
           document.getElementById((currIdx - 1)+ "P1").style.backgroundColor = "yellow"
       } else {
           document.getElementById((currIdx - 1)+"P1").style.backgroundColor = "white"
           document.getElementById((currIdx - 1)+"P2").style.backgroundColor = "yellow"
       }
  }

  useEffect(() => {
      if(prevMoveListObj.length > 1 && (prevMoveListObj.length > Number(currIdx+1))) {
          setNextDisability(false)
      } else {
          setNextDisability(true)
      }
      if (currIdx > 0) {
          setPrevDisability(false)
      } else {
          setPrevDisability(true)
      }

  }, [prevMoveListObj])


  return (
    <div className={"PreMoveList"} id={"PrevListMoveButtons"}>
      <button
        id={"PrevButtonP"}
        onClick={(e) => {
          handlePrev(e);
        }}
        disabled={prevDisability}
      >
        Prev
      </button>
      <button
        id={"NextButtonP"}
        onClick={(e) => handleNext(e)}
        disabled={nextDisability}
      >
        Next
      </button>
    </div>
  );
}
