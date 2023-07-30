import {NavLink} from "react-router-dom";

export function NOTFOUNDPAGE () {
    return (
        <div className={"h-[100vh] w-[100vw]  items-center "}>
            <img
                className={"w-[100%] h-[80%] m-auto items-center "}
                src={"/404NOTFOUND/404NOTFOUND.jpg"}/>
            <NavLink className={"text-white no-underline font-bold text-5xl m-auto " +
                " " +
                "flex justify-center items-center " +
                "hover:bg-violet-900 font-bold "
               } to={"/"}>HOME PLS</NavLink>
        </div>
    )
}