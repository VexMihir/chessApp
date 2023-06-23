import {useDispatch} from "react-redux";
import {endingPointUpdate, pauseMoveList} from "../../../../Redux/Action/PGN_Actions";

export function PrevMoveEndButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
        dispatch(endingPointUpdate())
    }

    return (
        <button
            className={"PrevMoveList"}
            key={"PrevMoveStarButton"}
            id={"PrevMoveStarButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        >END</button>
    )
}