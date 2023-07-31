import {QueryTable} from "../Table/QueryTable";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export function PrevGameQueryChildPage() {

    const pgnData = useSelector((state)=>state.PrevGameQuery.databaseArr);
    const OFFSET = 1
    const CARDSPERPAGE = 5;

    let {pageNum} = useParams();
    pageNum = Number(pageNum);
    let startIndex = (pageNum - OFFSET)*CARDSPERPAGE;
    let endIndex = (startIndex + CARDSPERPAGE)


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
            newObj["result"] = items.result
            newObj["numberOfMoves"] = items.transition.length;
            ret.push(newObj)
        }
        return ret;

    }

    const data = parseSubArr(subArr)

    return (
        <div className={"flex justify-center w-[90%] h-[90%] m-auto"}>
            <QueryTable prop={
                {
                    data,
                    pageNum
                }
            } />
        </div>
    )
}
