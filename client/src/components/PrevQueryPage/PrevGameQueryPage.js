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
            <div className={"text-custom-black font-bold text-5xl relative m-auto"}>
               <h1>CHESS DATABASE</h1>
            </div>
            <div className={"flex flex-col w-[100%] text-custom-black items-centre justify-centre"}>
                <Outlet />
                <Pagination />
            </div>
        </div>
    )
}