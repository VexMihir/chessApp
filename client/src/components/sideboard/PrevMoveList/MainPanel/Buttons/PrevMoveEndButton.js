import {useDispatch} from "react-redux";
import {endingPointUpdate, pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'


export function PrevMoveEndButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
        dispatch(endingPointUpdate())
    }

    return (
        <button className="bg-white hover:bg-violet-900 active:shadow-violet-950
        py-2 px-4 border border-gray-400 rounded"
            key={"PrevMoveEndButton"}
            id={"PrevMoveEndButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        ><FontAwesomeIcon icon={faForward} size={"xl"} alignmentBaseline={"central"}/></button>
    )
}