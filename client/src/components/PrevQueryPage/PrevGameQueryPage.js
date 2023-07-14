import "./PrevGameQueryPage.css"
import {Outlet, useNavigate} from "react-router-dom";
import {Pagination} from "./Pagnination/Pagination";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDBObj} from "../../Redux/Thunk/PrevGameDB";

export function PrevGameQueryPage() {
    const dispatch = useDispatch()
    const initFlag = useSelector((state)=>state.PrevGameQuery.flag)
    const navigate = useNavigate()
    let flag = false;

    useEffect(()=> {
        if (flag) return;
        if (!initFlag) {
            dispatch(getDBObj())
        }
        navigate("/previousGameView/1");
        return (
            () => {
                flag = true;
            }
        )
    }, [])
    return (
        <div className={"flex flex-col absolute w-[100%] text-white overflow-hidden"} >
            <div className={"text-white font-bold text-xl relative m-auto"}>
               <h1>CHESS DATABASE</h1>
            </div>
            <div className={"flex flex-col w-[100%] text-white items-centre"}>
                <Outlet />
                <Pagination />
            </div>
        </div>
    )
}