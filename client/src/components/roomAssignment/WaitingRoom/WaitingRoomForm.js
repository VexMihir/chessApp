import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { SocketContext } from "../../../context/socket";
import { EVENTS } from "../../../constants/aliases";

export function WaitingRoomForm () {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);
    const errorPage = useSelector(state=>(state.SetError));
    const navigate = useNavigate()
    const socket = useContext(SocketContext)

    let {state} = useLocation();

    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName, state.selectedTimeControl, state.selectedIncrementControl))

    }, [])

    useEffect(() => {
        if (errorPage) {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div className="flex flex-col items-center justify-start h-[100%]">
            <h2 className={"rounded text-custom-black"}>Your Room Number is {roomNumber}</h2>
            <div className="text-center">
                <NavLink
                    className=
                        {"m-auto text-center " +
                            "no-underline border border-custom-black py-3 px-4 hover:shadow-transparent " +
                            "text-custom-black text-right font-bold " +
                            "mt-[1rem] join-button"}
                    to={"/inGameView/"+ roomNumber}
                    state={{userName: state.userName}}
                    onClick={()=>{
                        socket.emit(EVENTS.JOIN_ROOM, roomNumber, state.userName)
                    }}
                >Start Game!</NavLink>
            </div>
        </div>
    )
}