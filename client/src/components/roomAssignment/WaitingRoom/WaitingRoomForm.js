import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { SocketContext } from "../../../context/socket";

export function WaitingRoomForm () {//({socket}) {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);
    const errorPage = useSelector(state=>(state.SetError));
    const navigate = useNavigate()

    let {state} = useLocation();

    const socket = useContext(SocketContext)

    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName))
    }, [])

    useEffect(() => {
        if (errorPage) {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div>
            <h2>Your Room Number is {roomNumber}</h2>
            <Link className={"invisible"} to="/" replace/>
            <NavLink
                className=
                    {"no-underline border  inline block mt-2 py-2 px-4 hover:bg-gray-100 " +
                        "text-white font-bold border border-purple-450 rounded " +
                        "shadow shadow-md shadow-white " +
                        "m-auto"}
                to={"/inGameView/"+ roomNumber}
                state={{userName: state.userName}}
                onClick={()=>{
                    socket.emit("join room",roomNumber, state.userName, () => {})
                }}
                >Start Game</NavLink>
        </div>
    )
}