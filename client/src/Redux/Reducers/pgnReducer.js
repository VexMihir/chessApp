import { PGNOBJ, ADD_PGN } from "../String/pgn";

export function pgnReducer(state = PGNOBJ, action) {// should be called the pgnObj 
    switch (action.type) {
        case ADD_PGN: {
            console.log("line 11 PGN");
            console.log(action.payload);

            // return {
            //     ...state,
            //     prevMoveListFEN: [
            //         ...state.prevMoveListFEN, action.payload
            //     ]
            // }

        }
        default: return state;
    }
}