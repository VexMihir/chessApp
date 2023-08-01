import {NavLink} from "react-router-dom";
import {joinPage, queryPage} from "../../RouteString/RouteString";

export function NavBar() {
    return (
        <>
            <div className={"flex flex-row justify-evenly p-[2rem] h-[95%] w-[95%] "}>
                <NavLink className={"no-underline text-white text-lg font-bold " +
                    "hover:text-yellow-400 "}
                         to={joinPage} >Join Game</NavLink>
                <NavLink className={"no-underline text-white text-lg font-bold " +
                    "hover:text-yellow-400 "}
                         to={queryPage}>Database Collection</NavLink>
            </div>
        </>
    )
}