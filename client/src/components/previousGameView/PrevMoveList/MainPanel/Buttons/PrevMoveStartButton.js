import {useDispatch} from "react-redux";
import {pauseMoveList, startingPointUpdate} from "../../../../../Redux/Action/prevGamViewActions";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function PrevMoveStartButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
        dispatch(startingPointUpdate())
    }

    return (
        <button className="bg-transparent hover:bg-custom-pale active:shadow-custom-pale py-2 px-4 rounded shadow shadow-white shadow-md"
                key={"PrevMovePauseButton"}
                id={"PrevMovePauseButton"}
                onClick={(e)=>{handleStartOnClick(e)}}
        ><FontAwesomeIcon icon={faBackward} color={"white"} size={"xl"} alignmentBaseline={"central"}/></button>

    )
}