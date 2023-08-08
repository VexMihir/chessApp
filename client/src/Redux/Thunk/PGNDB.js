import {loadDataBaseObj} from "../Action/prevGameQueryActions";
import {gameHistoryParser} from "./DBObjParser";
import {setERROR} from "../Action/errorAction";


// export const addItemsAsync = createAsyncThunk("item/addItems", async (item) => {
//     return await fetch(SERVER_URI + "/items", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });


export function postPGNObj(PGNObj) {


    //if you do not return the following, it will redirect you to the middleware function
    return async (dispatch, getState) => {
    //     try {
    //         let payload = []
    //         const response = await fetch(REACT_APP_BACKEND_URL || "http://localhost:5001/games",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(PGNObj),
    //             }
    //         )
    //         if (response.status === 200) {
    //             setERROR(false)
    //             let result = await response.json();
    //             for (let items of result) {
    //             let parsedObj = gameHistoryParser(items.history);
    //             let pgnObj = {};
    //             pgnObj["prevMoveListFEN"] = parsedObj.fenStrArr;
    //             pgnObj["prevMoveListLAN"] = parsedObj.sanArr;
    //             pgnObj["flags"] = parsedObj.flagArr;
    //             pgnObj["transition"] = parsedObj.fromToArr;
    //             pgnObj["playerOne"] = items.playerOneData.username + "(" +items.playerOneData.color + ")";
    //             pgnObj["playerTwo"] = items.playerTwoData.username + "(" +items.playerTwoData.color + ")";
    //             pgnObj["date"] = items.date;
    //             pgnObj["result"] = items.winner
    //             payload.push(pgnObj);
    //             }
    //             dispatch(loadDataBaseObj(payload));
    //         } else if (response.status >= 400 ) {
    //             dispatch(setERROR(true))
    //         }
        // } catch (error) {
        //     dispatch(setERROR(true))
        //     console.log(error.message)
        // }
    }
}