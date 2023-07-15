import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {NavLink, useLocation} from "react-router-dom";

export function WaitingRoomForm () {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);

    let {state} = useLocation();

    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName))
    }, [])


    return (
        <div>
            <h2>Your Room Number is {roomNumber}</h2>
            <NavLink
                className=
                    {"no-underline border  inline block mt-2 py-2 px-4 hover:bg-gray-100 " +
                        "text-white font-bold border border-purple-450 rounded " +
                        "shadow shadow-md shadow-white " +
                        "m-auto"}
                to={"/inGameView/"+ roomNumber}
                state={{userName: state.userName}
                }>Start Game</NavLink>
        </div>
    )
}