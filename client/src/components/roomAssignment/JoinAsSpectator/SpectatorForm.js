import {NavLink} from "react-router-dom";
import {useState} from "react";

export function SpectatorForm() {//{socket}) {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState(false);
    const [roomEror, setRoomNumberError] = useState(false);


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
        if(!e.target.value || e.target.value.length === 0 || isNaN(e.target.value) || e.target.value < 0 || e.target.value > 1000000) {
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
        <div className={"flex justify-center items-end h-screen"}>
        <div className={"w-[50%] flex flex-col mb-1"}>
            <fieldset className={"w-[95%] " +
                "rounded-xl p-2 border-custom-black border-10"}>
                <legend className={"rounded text-custom-black " }>Join As Spectator</legend>
                <label className = {"rounded text-custom-black"} >Enter Room Number</label>
                <br/>
                <input required
                        type={"number"}
                        min={0}
                        max={1000000}
                        onChange={(e)=>(handleRoomNumber(e))}
                        className={"peer/Num rounded-md text-custom-black py-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%]"}
                        onBlur={(e)=>{checkInvalid(e)}}
                 />
                {
                     roomEror?  <p className="mb-1 text-red-700  text-sm">
                         <mark className={"bg-transparent text-red-600"}>Room number must be a number between 0 and 1000000
                         </mark></p>: ""

                 }
                <br/>
                <label className = {"rounded text-custom-black"}>Enter username</label>
                <br/>
                <input required
                        type={"text"}
                        onChange={(e)=>(handleOnChange(e))}
                        className={"peer/Text rounded-md text-custom-black py-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%] relative"}
                        onBlur={(e)=>{checkEmptyUserName(e)}}
                 />
                 {
                     userNameError?  <p className="mb-1 text-red-700  text-sm">
                         <mark className={"bg-transparent text-red-600"}>Username cannot be empty</mark></p>: ""

                 }
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
                         finalCheck(e)
                     }}
                 >Join As Spectator</NavLink>
             <br />
         </div>
         </div>
     )
}