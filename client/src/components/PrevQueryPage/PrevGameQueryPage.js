/**
 * Frontend Table for Previous Games
 *
 * This frontend table displays information about previous games, spanning across multiple pages for easy navigation.
 * Users can view game details and click to access the normal view of the playback feature, enabling them to interact
 * with each move step by step.
 *
 * Dependencies: SetError reducer, prevGameQuery reducer
 *
 * Note: Ensure the SetError reducer is implemented to handle any potential errors.
 * PrevGameQuery is implemented to retrieve  data back from MongoDB
 */


import {Outlet, useNavigate} from "react-router-dom";
import {Pagination} from "./Pagnination/Pagination";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDBObj} from "../../Redux/Thunk/PrevGameDB";
import {NavBar} from "../NavBar/NavBar";

export function PrevGameQueryPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errorPage = useSelector(state=>(state.SetError));

    let initial = false
    let flag = false;


    useEffect( () => {
        if (flag) return;
        dispatch(getDBObj());
        initial = true
        return (
            () => {
                flag = true;
            }
        )
    }, [])

    useEffect(() => {
        if (!errorPage) {
            navigate("/previousGameView/1");
        } else if(errorPage && flag) {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div className={"flex flex-col absolute w-[100%] text-custom-black overflow-hidden"} >
            <NavBar />
            <div className={"text-custom-black font-bold text-4xl relative m-[2rem] h-[10%] text-center items-center"}>
               <h1 className={" text-center m-0"}>CHESS DATABASE</h1>
            </div>
            <div className={"flex flex-col w-[100%] text-custom-black items-centre justify-centre"}>
                <Outlet />
                <Pagination />
            </div>
        </div>
    )
}