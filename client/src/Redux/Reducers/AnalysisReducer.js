import {GETANALYSIS} from "../String/analysis";

const initState = {
    bestMoves: [],
    displayScore: [],
    rawScore: [],
    label: [],
};

export function analysisReducer(state=initState, action) {
    switch (action.type) {
        case GETANALYSIS: {
            return  {
                ...state,
                bestMoves: action.payload.bestMoves,
                displayScore: action.payload.displayScore,
                rawScore: action.payload.rawScore,
                label: action.payload.label
            }
        }
        default: return state
    }
}