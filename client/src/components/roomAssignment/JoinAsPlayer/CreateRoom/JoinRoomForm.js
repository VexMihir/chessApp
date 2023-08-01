import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function JoinRoomForm({socket}) {
    const refInput = useRef(null)
    const [userName, setUserName] = useState(null);
    const [userNameError, setuserNameError] = useState(false);

    const handleOnChange = (e) => {
        checkEmptyUserName(e)
        e.preventDefault();
        setUserName(e.target.value);
    }

    const checkEmptyUserName = (e) => {
        if(!e.target.value || e.target.value.length === 0) {
            setuserNameError(true)
        } else {
            setuserNameError(false)
        }
    }

    const finalCheck = (e) => {
        if (!userName || userName.length === 0 ) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        }
    }

    return (
        <div className={"w-[50%] h-[100%] flex flex-col mb-1"}>
            <fieldset className={"w-[95%] " +
                "rounded-xl p-2 border-custom-black border-10"}>

                <legend className={"rounded text-custom-black " }>Create Room</legend>
                <label className = {"rounded text-custom-black"} >Enter username</label>
                <input required
                       type={"text"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black py-[0.25rem] border-custom-black border-10 bg-transparent " +
                           "w-[90%] relative " +
                           "m-auto"}
                />
                {
                    userNameError?  <p className="mb-1 text-red-700  text-sm">
                        <mark className={"bg-transparent text-red-600"}>Username cannot be empty</mark></p>: ""

                }
            </fieldset>
            <NavLink
                className=
                    {
                        "m-auto text-center " +
                        "no-underline border border-custom-black rounded-xl py-3 px-4 hover:shadow-transparent " +
                        "text-custom-black font-bold rounded" +
                        "shadow shadow-md shadow-custom-black mt-[1rem]"
                    }
                onClick={(e)=>{finalCheck(e)}}
                to={"/waitingRoomForm"}
                state={{userName: userName}
                }>Create Room</NavLink>
        </div>
    )
}