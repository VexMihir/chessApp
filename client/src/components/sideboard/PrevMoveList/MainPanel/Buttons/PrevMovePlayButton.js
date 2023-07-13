import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import {loadPageContinuously} from "../../../../../Redux/Thunk/PrevMovePlayButton";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function PrevMovePlayButton() {
    const dispatch = useDispatch()
    const [setPlay, setPlayState] = useState(false);
    const currState = useSelector((state) => state.PGNReducer);
    const currPGNOBj = JSON.parse(currState.PGNOBJ)
    let currIndx = JSON.parse(currState.currIdx)

    async function handleStartOnClick(e) {
        dispatch(pauseMoveList(true))
        e.preventDefault();
        while (currIndx < currPGNOBj.prevMoveListFEN.length-1) {
            await dispatch(loadPageContinuously())
            currIndx++;
        }
    }

    useEffect(()=>{
        if (currIndx === currPGNOBj.prevMoveListFEN.length-1) {
            setPlayState(true)
        } else {
            setPlayState(false)
        }
    }, [currIndx,  currPGNOBj.prevMoveListFEN.length])

    return (
        <button className="bg-white hover:shadow-lg active:shadow-black
        py-2 px-4 border border-gray-400 rounded"
            id={"PrevMoveStarButton"}
            disabled={setPlay}
            onClick={async (e) => {
                await handleStartOnClick(e)
            }}
        ><FontAwesomeIcon icon={faCirclePlay} size={"xl"} alignmentBaseline={"central"}/></button>
    )
}