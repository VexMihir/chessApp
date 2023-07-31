import {NavLink, useLocation} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import { SocketContext } from "../../../context/socket";

export function SpectatorForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState(false);
    const [roomEror, setRoomNumberError] = useState(false);

    const socket = useContext(SocketContext)

    const handleOnChange = (e) => {
        checkEmptyUserName(e)
        e.preventDefault();
        setUserName(e.target.value)
    }

    const handleRoomNumber = (e) => {
        checkInvalid(e)
        e.preventDefault();
        setRoomNumber(Number(e.target.value))
    }

    const checkEmptyUserName = (e) => {
        if(!e.target.value || e.target.value.length === 0) {
            setuserNameError(true)
        } else {
            setuserNameError(false)
        }
    }

    const checkInvalid = (e) => {
        if(!e.target.value || e.target.value.length === 0 || !isNaN(e.target.value)) {
            setRoomNumberError(true)
        } else {
            setRoomNumberError(false)
        }
    }

    const finalCheck = (e) => {
        if (!userName || userName.length === 0 ) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        } else if (!roomNumber || roomNumber < 0 || roomNumber > 1000000) {
            e.preventDefault();
            window.alert("ROOM NUMBER IS INVALID")
        }
    }

    return (
        <div className={"w-[100%] h-[100%] flex flex-col mb-1"}>
            <fieldset className={"grid grid-rows-2 grid-cols-2 m-auto p-2 mt-[1rem] w-[80%] " +
                "rounded-xl p-0 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded text-white m-1"}>Join As Spectator</legend>
                <label>Enter room number</label>
                <br />
                <input required
                       type={"number"}
                       min={0}
                       max={1000000}
                       onChange={(e)=>(handleRoomNumber(e))}
                       className={"peer/Num rounded-md text-white py-0.5 border-none m-1 bg-violet-900/30 w-[90%]"}
                       onBlur={(e)=>{checkInvalid(e)}}
                />
                <br />
                {
                    roomEror?  <p className="mb-1 text-pink-700  text-sm">
                        <mark className={"bg-white text-pink-600"}>Room number must be a number between 0 and 1000000
                        </mark></p>: ""

                }
                <br />
                <label>Enter username</label>
                <br />
                <input required
                       type={"text"}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"peer/Text rounded-md text-white py-0.5 border-none m-1 bg-violet-900/30 w-[90%] relative"}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                />
                <br />
                {
                    userNameError?  <p className="mb-1 text-pink-700  text-sm">
                        <mark className={"bg-white text-pink-600"}>Username cannot be empty</mark></p>: ""

                }
                <br />
            </fieldset>
            <NavLink
                    className=
                        {"m-auto text-center " +
                            "no-underline border py-3 px-4 hover:bg-gray-900 " +
                            "text-white font-bold rounded " +
                            "shadow shadow-md shadow-white mt-[1rem]"
                            }
                    to={"/inGameView/"+ roomNumber}
                    state={{userName: userName}}
                    onClick={(e)=>{
                        socket.emit('join as spectator', roomNumber, userName);
                        finalCheck(e)
                    }}
                >Join As Spectator</NavLink>
            <br />
        </div>
    )
}