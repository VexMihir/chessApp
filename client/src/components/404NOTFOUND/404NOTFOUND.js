import {NavLink} from "react-router-dom";

export function NOTFOUNDPAGE () {
    return (
        <div className={"h-[100vh] w-[100vw]  items-center "}>
            <img
                className={"w-[80%] h-[80%] m-auto items-center "}
                src={"https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000"}/>
            <NavLink className={"text-white no-underline font-bold text-5xl m-auto " +
                "rounded-l-2xl " +
                "flex justify-center items-center " +
                "hover:bg-violet-900 font-bold "
               } to={"/"}>HOME PLS</NavLink>
        </div>
    )
}