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
        <button className={"bg-transparent hover:bg-custom-pale active:shadow-custom-pale py-2 px-4 rounded shadow shadow-white shadow-md"}
            key={"PrevMoveEndButton"}
            id={"PrevMoveEndButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        ><FontAwesomeIcon color={"white"} icon={faForward} size={"xl"} alignmentBaseline={"central"}/></button>
    )
}