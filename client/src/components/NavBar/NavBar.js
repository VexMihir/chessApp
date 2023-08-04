import {NavLink} from "react-router-dom";
import {joinPage, queryPage} from "../../RouteString/RouteString";
import "./NavBar.css"

export function NavBar() {
    return (
        <>
            <div className={"flex flex-row justify-evenly pt-[0.75rem] h-[95%] w-[100%] items-center "}>
                <NavLink className="custom-button"
                         to={joinPage} >Join Game</NavLink>
                <NavLink className="custom-button"
                         to={queryPage}>Database Collection</NavLink>
            </div>
        </>
    )
}