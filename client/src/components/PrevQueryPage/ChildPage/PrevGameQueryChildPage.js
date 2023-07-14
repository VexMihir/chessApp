import {QueryTable} from "../Table/QueryTable";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export function PrevGameQueryChildPage() {

    const pgnData = useSelector((state)=>state.PrevGameQuery.databaseArr);
    const CARDPERPAGE = 5;

    let {pageNum} = useParams();
    pageNum = Number(pageNum);
    let startIndex = (pageNum - 1)*CARDPERPAGE;
    let endIndex = (startIndex + 5)


    const subArr = [...pgnData.slice(startIndex, endIndex)]


    const parseSubArr = (data) => {
        let ret = [];
        let newObj = {};

        for (let items of data) {
            newObj = {};
            newObj["game"] = items["playerOne"] + " vs " + items["playerTwo"];
            newObj["playerOne"] =  items["playerOne"];
            newObj["playerTwo"] = items["playerTwo"];
            newObj["date"] = items["date"];
            //newObj["numberOfMoves"] = items.transition.length;
            //newObj["lastFenStr"] = items.prevMoveListFEN[items.prevMoveListFEN.length - 1]
            ret.push(newObj)
        }
        return ret;

    }

    const data = parseSubArr(subArr)

    return (
        <div className={"tableDB"}>
            <QueryTable data={data} />
        </div>
    )
}
