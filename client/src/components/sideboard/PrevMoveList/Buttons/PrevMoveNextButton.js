import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {indiPieceUpdate, pauseMoveList} from "../../../../Redux/Action/PGN_Actions";

export function PrevMoveNextButton() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.PGNReducer)
    const currIdx = state.currIdx;
    const [nextDisability, setNextDisability] = useState(true);
    const prevMoveListObj = JSON.parse(state.PGNOBJ).prevMoveListFEN


    function handleNext(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
        dispatch(indiPieceUpdate(1));
    }


    useEffect(() => {
        if(prevMoveListObj.length > 1 && (prevMoveListObj.length > Number(currIdx+1))) {
            setNextDisability(false)
        } else {
            setNextDisability(true)
        }

    }, [prevMoveListObj])


    return (
            <button
                id={"NextButtonP"}
                onClick={(e) => handleNext(e)}
                disabled={nextDisability}
            >NEXT</button>
    );
}
