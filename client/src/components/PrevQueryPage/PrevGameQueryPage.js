import {useSelector} from "react-redux";
import {QueryTable} from "./QueryTable";
import "./PrevGameQueryPage.css"
export function PrevGameQueryPage() {
    const pgnData = useSelector((state)=>state.PrevGameQuery);

    const getHeaders = (data) => {
        let headerKeys = [];
        const keys = Object.keys(data[0]);
        for (let items of keys) {
            if (typeof data[0][items] ===  "string" || typeof data[0][items] === "number") {
                headerKeys.push(items)
            }
        }
        return headerKeys;
    }
    return (
        <div >
            <div className={"header"}>
                <img src={"https://static-00.iconduck.com/assets.00/chess-icon-2048x2048-fv5fz4v1.png"} />
               <h1>CHESS DATABASE</h1>
            </div>
            <div className={"tableDB"}>
                <QueryTable data={pgnData} dataKey={getHeaders(pgnData)} />
            </div>
        </div>
    )
}