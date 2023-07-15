import {loadDataBaseObj} from "../Action/prevGameQueryActions";
import {gameHistoryParser} from "./DBObjParser";

export function getDBObj() {

    return async (dispatch, getState) => {
        try {
            let payload = []
            const response = await fetch("http://localhost:5001/games",
                {
                    method: "GET"
                }
            )

            if (response.status === 200) {
                let result = await response.json();
                for (let items of result) {
                let parsedObj = gameHistoryParser(items.history);
                let pgnObj = {};
                pgnObj["prevMoveListFEN"] = parsedObj.fenStrArr;
                pgnObj["prevMoveListLAN"] = parsedObj.sanArr;
                pgnObj["flags"] = parsedObj.flagArr;
                pgnObj["transition"] = parsedObj.fromToArr;
                pgnObj["playerOne"] = items.playerOneUsername;
                pgnObj["playerTwo"] = items.playerTwoUsername;
                pgnObj["date"] = items.date.toString();
                if(items.winner) {
                    pgnObj["result"] = "1-0"
                } else {
                    pgnObj["result"] = "0-1"
                };
                payload.push(pgnObj);
                }
            }
            /*let result = dbMockArray
            for (let items of result) {
                let parsedObj = gameHistoryParser(items.history);
                let pgnObj = {};
                pgnObj["prevMoveListFEN"] = parsedObj.fenStrArr;
                pgnObj["prevMoveListLAN"] = parsedObj.sanArr;
                pgnObj["flags"] = parsedObj.flagArr;
                pgnObj["transition"] = parsedObj.fromToArr;
                pgnObj["playerOne"] = items.playerOne;
                pgnObj["playerTwo"] = items.playerTwo;
                pgnObj["date"] = items.date.toString();
                payload.push(pgnObj);
            }*/
            dispatch(loadDataBaseObj(payload));
        } catch (error) {
            console.log(error.message)
        }
    }
}