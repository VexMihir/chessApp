import {useContext, useEffect} from "react";
import { SocketContext } from "../../../../context/socket";
import {NavLink} from "react-router-dom";
<<<<<<< HEAD
import {useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
=======
import {useState} from "react";


>>>>>>> analysis-fixes2

export function FindRoomForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");
    const [roomEror, setRoomNumberError] = useState("invisible");

    const [isRoomFull, setIsRoomFull] = useState('');

    
    const roomNumbers = useSelector(state=>{
        if (state.RoomsReducer.data !== undefined) {
            return state.RoomsReducer.data;
        } else {
            return null
        }
    })

    const socket = useContext(SocketContext);

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
        if(!e.target.value || e.target.value.length === 0 || isNaN(Number(e.target.value))) {
            setRoomNumberError(" ")
        } else {
            setRoomNumberError("invisible")
        }
    }
    const finalCheck = (e) => {
        if (!userName || userName.length === 0) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        } else if (!roomNumber || roomNumber < 0 || roomNumber > 1000000) {
            e.preventDefault();
            window.alert("ROOM NUMBER IS INVALID")
        } else if (isRoomFull) {
            e.preventDefault();
            window.alert("The room is full. If you want to join the room, you can join as a spectator by clicking the Join As Spectator tab.");
        } else {
            socket.emit('join room', roomNumber, userName, (response) => {

            });

        }

    }

<<<<<<< HEAD
    useEffect(() => {

        if (roomNumber !== null) {
            socket.emit('is room full', roomNumber);
        }
        socket.on('is room full', (isRoomFull) => {
            console.log("line 87 room full");
            setIsRoomFull(isRoomFull)
        })

    }, [roomNumber]) 


    return (
        <div className={"w-[50%] h-[100%] flex flex-col mb-1 justify-center"}>
            <fieldset className={" " +
                "rounded-xl p-2 border-custom-black border-10"}>
                <legend className={"rounded-2xl text-custom-black"}>Find Room</legend>
                <label className = {"rounded-2xl text-custom-black"}>Enter room number</label>
                <br/>

                {/* Source: https://www.w3schools.com/tags/tag_option.asp */}
                <select id="rooms">
                    {roomNumbers.map((roomNumber, index) => {
                        if (roomNumber.roomNumber !== undefined) {
                            console.log(roomNumber.roomNumber);
                            return <option key={index} value={roomNumber.roomNumber}>{index + 1}. {roomNumber.roomNumber}</option>
                        }
                    })}
                    
                </select>

=======
    return (
        <div className={"w-[50%] h-[100%] flex flex-col items-stretch  "}>
            <fieldset className={"flex flex-col h-[85%] " +
                "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[0.5rem]  px-[0.5rem]"}>
                <legend className={"rounded-2xl text-custom-black text-md text-black"}>Find Room</legend>
                <label className = {"rounded-2xl text-custom-black text-sm"}>Enter room number</label>
>>>>>>> analysis-fixes2
                <input  required
                        min={0}
                        max={1000000}
                        type={"number"}
                        onChange={(e)=>(handleRoomNumber(e))}
<<<<<<< HEAD
                        className={"peer/Num rounded-md text-custom-black px-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%]"}
                        // onBlur={(e)=>{checkInvalid(e)}}
=======
                        className={"peer/Num rounded-md text-custom-black border-custom-black border-10 bg-transparent w-[90%]"}
                        onBlur={(e)=>{checkInvalid(e)}}
>>>>>>> analysis-fixes2
                />
                <p className={`text-red-600  text-xs m-0 ${roomEror}`}>Invalid Number(must between 0 and 1000000)</p>
                <label className = {"rounded text-custom-black m-0 text-sm"}>Enter username</label>
                <input required
                       onChange={(e)=>(handleOnChange(e))}
<<<<<<< HEAD
                    //    onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black  px-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%]"}
=======
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"}
>>>>>>> analysis-fixes2
                />
                <p className={`text-red-600 m-0 text-xs mb-[0.2rem] ${userNameError}`}>Empty Username</p>
            </fieldset>
            <NavLink
                className=
                    {" text-center " +
                        "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
                        "text-custom-black font-bold rounded " +
                        "shadow shadow-md shadow-custom-black " +
<<<<<<< HEAD
                        ""}
                onClick={(e)=> {
=======
                        "h-[10%] py-[0.5rem] px-4 m-auto "}
                onClick={(e)=>{
>>>>>>> analysis-fixes2
                    finalCheck(e)
                }}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
    )
}