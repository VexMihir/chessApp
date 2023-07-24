import {Outlet, useNavigate} from "react-router-dom";
import {Pagination} from "./Pagnination/Pagination";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDBObj} from "../../Redux/Thunk/PrevGameDB";

export function PrevGameQueryPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errorPage = useSelector(state=>(state.SetError));

    let flag = false;


    useEffect( () => {
        if (flag) return;
        dispatch(getDBObj());
        return (
            () => {
                flag = true;
            }
        )
    }, [])

    useEffect(() => {
        if (!errorPage) {
            navigate("/previousGameView/1");
        } else {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div className={"flex flex-col absolute w-[100%] text-white overflow-hidden"} >
            <div className={"text-white font-bold text-5xl relative m-auto"}>
               <h1>CHESS DATABASE</h1>
            </div>
            <div className={"flex flex-col w-[100%] text-white items-centre justify-centre"}>
                <Outlet />
                <Pagination />
            </div>
        </div>
    )
}