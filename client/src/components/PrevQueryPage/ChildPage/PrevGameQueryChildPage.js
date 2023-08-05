import { QueryTable } from "../Table/QueryTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function PrevGameQueryChildPage() {
    const pgnData = useSelector((state) => state.PrevGameQuery.databaseArr);
    const OFFSET = 1
    const CARDSPERPAGE = 5;
    const navigate = useNavigate();

    let { pageNum } = useParams();
    pageNum = Number(pageNum);
    let startIndex = (pageNum - OFFSET) * CARDSPERPAGE;
    let endIndex = (startIndex + CARDSPERPAGE)


    const subArr = [...pgnData.slice(startIndex, endIndex)]

    useEffect(() => {
        const handleBackButton = (e) => {
            if (pageNum === 1) {
                e.preventDefault();
                navigate('/');
            }
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate, pageNum]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const parseSubArr = (data) => {
        let ret = [];
        let newObj = {};

        for (let items of data) {
            newObj = {};
            newObj["game"] = items["playerOne"] + " vs " + items["playerTwo"];
            newObj["playerOne"] = items["playerOne"];
            newObj["playerTwo"] = items["playerTwo"];
            newObj["date"] = formatDate(items["date"]);
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
