/**
 * NavBar Component
 *
 * This component represents the navigation bar at the top of the application.
 * It provides links to different sections of the application, including joining a game and
 * accessing the database collection. It uses React Router's NavLink for navigation and
 * the useNavigate hook for programmatic navigation. The component also applies custom styling
 * for the navigation buttons.
 *
 * @module NavBar
 */

import { NavLink } from "react-router-dom";
import { joinPage, queryPage } from "../../RouteString/RouteString";
import "./NavBar.css"
import { useNavigate } from "react-router-dom";

export function NavBar() {
    let navigate = useNavigate()
    return (
        <>
            <div className={"flex flex-row justify-evenly pt-[0.75rem] h-[95%] w-[100%] items-center "}>
                <NavLink className="custom-button"
                    onClick={() => {
                        navigate(joinPage)
                        window.location.reload();
                    }
                    } >Join Game</NavLink>
                <NavLink className="custom-button"
                    to={queryPage}>Database Collection</NavLink>
            </div>
        </>
    )
}