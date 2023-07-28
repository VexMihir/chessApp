import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

export function JoinRoomForm({socket}) {
    const refInput = useRef(null)
    const [userName, setUserName] = useState(null);
    const [userNameError, setuserNameError] = useState(false);

    // let {state} = useLocation();

    // useEffect(() => {
    //     console.log("line 12", state);
    // }, [])

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
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>

                <legend className={"rounded text-white " }>Create Room</legend>
                <label>Enter username</label>
                <input required
                       type={"text"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-white py-[0.25rem] border-none bg-violet-900/30 " +
                           "w-[90%] relative " +
                           "m-auto"}
                />
                {
                    userNameError?  <p className="mb-1 text-pink-700  text-sm">
                        <mark className={"bg-white text-pink-600"}>Username cannot be empty</mark></p>: ""

                }
            </fieldset>
            <NavLink
                className=
                    {
                        "m-auto text-center " +
                        "no-underline border py-3 px-4 hover:bg-gray-900 " +
                        "text-white font-bold rounded " +
                        "shadow shadow-md shadow-white mt-[1rem]"
                    }
                onClick={(e)=>{finalCheck(e)}}
                to={"/waitingRoomForm"}
                state={{userName: userName}
                }>Create Room</NavLink>
        </div>
    )
}