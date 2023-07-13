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
        <div >
            <div className={"header"}>
               <h1>CHESS DATABASE</h1>
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <Pagination />
            </div>
        </div>
    )
}