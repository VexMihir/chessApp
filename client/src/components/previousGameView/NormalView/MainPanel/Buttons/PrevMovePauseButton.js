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
        <button className="bg-transparent hover:bg-custom-pale active:shadow-custom-pale py-2 px-4 rounded shadow shadow-white shadow-md"
            key={"PrevMovePauseButton"}
            id={"PrevMovePauseButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        ><FontAwesomeIcon icon={faPause} color={"white"} size={"l"} alignmentBaseline={"central"}/></button>
    )
}