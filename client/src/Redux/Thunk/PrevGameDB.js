import {gameHistoryParser} from "./DBObjParser";
import {loadDataBaseObj} from "../Action/prevGameQueryActions";
import {dbMockArray} from "../../components/PrevQueryPage/testedMockObject/dbMockArray";

export function getDBObj() {

    return async (dispatch, getState) => {
        try {
            let payload = []
            /*const response = await fetch("http://localhost:5001",
                {
                    method: "GET"
                }
            )*/

            /*if (response.status === 200) {
                for (let items of result) {
                let parsedObj = gameHistoryParser(items.history);
                let pgnObj = {};
                pgnObj["prevMoveListFEN"] = parsedObj.fenStrArr;
                pgnObj["prevMoveListLAN"] = parsedObj.sanArr;
                pgnObj["flags"] = parsedObj.flagArr;
                pgnObj["transition"] = parsedObj.fromToArr;
                pgnObj["playerOne"] = items.players[0].username;
                pgnObj["playerTwo"] = items.players[1].username;
                pgnObj["date"] = items.date.toString();
                payload.push(pgnObj);
                }
            }
            }*/
            let result = dbMockArray
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
            }
            dispatch(loadDataBaseObj(payload));
        } catch (error) {
            console.log(error.message)
        }
    }
}