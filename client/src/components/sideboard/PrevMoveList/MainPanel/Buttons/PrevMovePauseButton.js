import {useDispatch} from "react-redux";
import {pauseMoveList} from "../../../../../Redux/Action/prevGamViewActions";
import {faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function PrevMovePausetButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
    }

    return (
        <button className="bg-white hover:bg-violet-900 active:shadow-violet-950
        py-2 px-4 border border-gray-400 rounded"
            key={"PrevMovePauseButton"}
            id={"PrevMovePauseButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        ><FontAwesomeIcon icon={faPause} size={"xl"} alignmentBaseline={"central"}/></button>
    )
}