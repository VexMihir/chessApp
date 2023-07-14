import {loadDataBaseObj} from "../Action/prevGameQueryActions";

export function getDBObj() {

    return async (dispatch, getState) => {
        try {
            let payload = []
            const response = await fetch("http://localhost:5001/getDBData",
                {
                    method: "GET"
                }
            )

            if (response.status === 200) {
                let result = await response.json();
                for (let items of result) {
                //let parsedObj = gameHistoryParser(items.history);
                let pgnObj = {};
                //pgnObj["prevMoveListFEN"] = parsedObj.fenStrArr;
                //pgnObj["prevMoveListLAN"] = parsedObj.sanArr;
                //pgnObj["flags"] = parsedObj.flagArr;
                //pgnObj["transition"] = parsedObj.fromToArr;
                pgnObj["playerOne"] = items.playerOneUsername;
                pgnObj["playerTwo"] = items.playerTwoUsername;
                pgnObj["date"] = items.date.toString();
                pgnObj["winner"] = items.winner;
                payload.push(pgnObj);
                }
            }
            dispatch(loadDataBaseObj(payload));
        } catch (error) {
            console.log(error.message)
        }
    }
}