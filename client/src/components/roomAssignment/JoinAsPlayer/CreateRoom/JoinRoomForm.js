import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function JoinRoomForm() {
    const refInput = useRef(null)
    const [userName, setUserName] = useState(null);
    const handleOnChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    return (
        <div className={"grid grid-rows-[1fr_auto] w-[80%] h-[80%] opacity-90 p-4"}>
            <fieldset className={"inline-block m-auto p-2 border border-solid border-purple-450 border-3 mt-[1rem] w-[80%] h-[10rem] " +
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>

                <legend className={"rounded text-white m-1" }>Create Room</legend>
                <input required
                       type={"text"} placeholder={"Enter Your User Name"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"peer/Text rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <p className="mb-1 invisible peer-invalid/Text:visible text-white font-extrabold text-sm">Username cannot be empty</p>
            </fieldset>
            <NavLink
                className=
                    {"no-underline border  inline block mt-4 py-3 px-4 hover:bg-gray-900 " +
                        "text-white font-bold border border-purple-450 rounded " +
                        "shadow shadow-md shadow-white " +
                        "m-auto"}
                to={"/waitingRoomForm"}
                state={{userName: userName}
                }>Create Room</NavLink>
        </div>
    )
}