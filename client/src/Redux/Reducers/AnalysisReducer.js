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
                bestMoves: [
                    ...state.bestMoves.slice(0, 0),
                    ...action.payload.bestMoves
                ],
                displayScore: [
                    ...state.displayScore.slice(0, 0),
                    ...action.payload.displayScore
                ],
                rawScore: [
                    ...state.rawScore.slice(0, 0),
                    ...action.payload.rawScore
                ],
                label: [
                    ...state.label.slice(0, 0),
                    ...action.payload.label
                ]

            }
        }
        default: return state
    }
}