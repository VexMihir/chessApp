/**  Button to go to the next move in the replay in the previous game view. 
 * Make uses of redux reducers to parse through the moves.
*/

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {indiPieceUpdate, pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function PrevMoveNextButton() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.PrevGameView)
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
        <button className="bg-transparent hover:bg-custom-pale active:shadow-custom-pale py-2 px-4 rounded shadow shadow-white shadow-md"
                key={"PrevMoveNextButton"}
                id={"NextButtonP"}
                onClick={(e) => handleNext(e)}
                disabled={nextDisability}
            ><FontAwesomeIcon color={"white"} icon={faCaretRight} size={"l"} alignmentBaseline={"central"}/></button>
    );
}
