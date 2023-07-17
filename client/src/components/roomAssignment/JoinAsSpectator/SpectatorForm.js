import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function SpectatorForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);

    const handleOnChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    const handleRoomNumber = (e) => {
        e.preventDefault();
        setRoomNumber(Number(e.target.value))
    }

    return (
        <div className={"grid grid-rows-[1fr_auto] w-[100%] h-[100%] opacity-90 p-4"}>
            <fieldset className={"inline-block m-auto p-2 border border-solid border-purple-450 border-3 mt-[1rem] " +
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded text-white m-1"}>Join As Spectator</legend>
                <legend className={"rounded text-white m-1"}>Enter Room Number</legend>
                <input type={"number"}
                       min={0}
                       max={10000}
                       placeholder={"Enter Room Number"}
                       onChange={(e)=>(handleRoomNumber(e))}
                       className={"rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <legend className={"rounded text-white m-1"}>Enter Your Username</legend>
                <input type={"text"} placeholder={"Enter Your User Name"}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
            </fieldset>
            <NavLink
                    className=
                        {"no-underline border  inline block mt-4 py-2 px-4 hover:bg-gray-900 " +
                            "text-white font-bold border border-purple-450 rounded " +
                            "shadow shadow-md shadow-white " +
                            "m-auto mb-[3rem]"}
                    to={"/inGameView/"+ roomNumber}
                    state={{userName: userName}}
                >Join As Spectator</NavLink>
        </div>
    )
}