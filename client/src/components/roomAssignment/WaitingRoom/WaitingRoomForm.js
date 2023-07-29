import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";

export function WaitingRoomForm () {//({socket}) {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);
    const errorPage = useSelector(state=>(state.SetError));
    const navigate = useNavigate()

    let {state} = useLocation();

    useEffect(()=> {
        // here create a random number using RESTful API, does it actually touch the socket.io? Yes after the GET function is executed the object is created
        dispatch(getRoomNumberAsync(state.userName))

        // if (socket) {
        // }

    }, [])

    // useEffect(() => {
    //     // socket.emit("join room",roomNumber, state.userName) // it can recognize it...        
    //     console.log("Waiting Room FOrm line 18", socket);
    //     console.log(roomNumber, state.userName);

    // }, [roomNumber, socket])

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
                // onClick={async ()=>{
                    // await socket.emit("join room",roomNumber, state.userName)
                    // console.log("line 40 waiting room form");
                // }}
                >Start Game</NavLink>
        </div>
    )
}