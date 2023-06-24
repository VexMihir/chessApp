import {useDispatch} from "react-redux";
import {pauseMoveList, startingPointUpdate} from "../../../../Redux/Action/PGN_Actions";

export function PrevMoveStartButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(true))
        dispatch(startingPointUpdate())
    }

    return (
            <button
                className={"PrevMoveList"}
                key={"PrevMoveStarButton"}
                id={"PrevMoveStarButton"}
                onClick={(e)=>{handleStartOnClick(e)}}
            >START</button>
    )
}