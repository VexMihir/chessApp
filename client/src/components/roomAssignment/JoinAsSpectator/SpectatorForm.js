import {NavLink, useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import { SocketContext } from "../../../context/socket";

export function SpectatorForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");
    const [roomEror, setRoomNumberError] = useState("invisible");

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
            setuserNameError(" ")
        } else {
            setuserNameError("invisible")
        }
    }

    const checkInvalid = (e) => {
        if(!e.target.value || e.target.value.length === 0 || isNaN(e.target.value) || e.target.value < 0 || e.target.value > 1000000) {
            setRoomNumberError(" ")
        } else {
            setRoomNumberError("invisible")
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
<<<<<<< HEAD
        <div className={"flex justify-center items-center h-screen"}>
        <div className={"w-[50%] flex flex-col mb-1 bg-[#ffffff]"}>
            <fieldset className={"w-[95%] " +
                "rounded-xl p-2 border-custom-black border-10"}>
                <legend className={"rounded text-custom-black " }>Join As Spectator</legend>
                <label className = {"rounded text-custom-black"} >Enter Room Number</label>
                <br/>
                <input required
                        type={"number"}
=======
        <div className={"w-[40%] h-[85%] flex flex-col m-auto  "}>
            <fieldset className={"flex flex-col h-[85%] " +
                "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[0.5rem]  px-[0.5rem]"}>
                <legend className={"rounded-2xl text-custom-black text-md text-black"}>Join As Spectator</legend>
                <label className = {"rounded-2xl text-custom-black text-sm"}>Enter room number</label>
                <input  required
>>>>>>> analysis-fixes2
                        min={0}
                        max={1000000}
                        type={"number"}
                        onChange={(e)=>(handleRoomNumber(e))}
                        className={"peer/Num rounded-md text-custom-black border-custom-black border-10 bg-transparent w-[90%]"}
                        onBlur={(e)=>{checkInvalid(e)}}
                />
                <p className={`text-red-600  text-xs m-0 ${roomEror}`}>Invalid Number(must between 0 and 1000000)</p>
                <label className = {"rounded text-custom-black m-0 text-sm"}>Enter username</label>
                <input required
<<<<<<< HEAD
                        type={"text"}
                        onChange={(e)=>(handleOnChange(e))}
                        className={"peer/Text rounded-md text-custom-black py-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%] relative"}
                        onBlur={(e)=>{checkEmptyUserName(e)}}
                 />
                 {
                     userNameError?  <p className="mb-1 text-red-700  text-sm">
                         <mark className={"bg-transparent text-red-600"}>Username cannot be empty</mark></p>: ""

                }
                <br />
                 </fieldset>
                 <NavLink
                     className=
                     {"m-auto text-center " +
                     "no-underline border border-custom-black rounded-xl py-3 px-4 mt-5 hover:shadow-transparent " +
                     "text-custom-black font-bold rounded " +
                     "shadow shadow-md shadow-custom-black " +
                     ""}
                     to={"/inGameView/"+ roomNumber}
                     state={{userName: userName}}
                     onClick={(e)=>{
                        socket.emit('join as spectator', roomNumber, userName);
                        finalCheck(e)
                     }}
                 >Join As Spectator</NavLink>
             <br />
         </div>
         </div>
=======
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"}
                />
                <p className={`text-red-600 m-0 text-xs mb-[0.2rem] ${userNameError}`}>Empty Username</p>
            </fieldset>
            <NavLink
                className=
                    {" text-center " +
                        "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
                        "text-custom-black font-bold rounded " +
                        "shadow shadow-md shadow-custom-black " +
                        "h-[10%] py-[0.5rem] px-4 m-auto "}
                onClick={(e)=>{
                    finalCheck(e)
                }}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
>>>>>>> analysis-fixes2
     )
}