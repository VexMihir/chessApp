import {GETANALYSIS} from "../String/analysis";

 export function getAnalysis(payload) {
    return {
        type: GETANALYSIS,
        payload: payload
    }
}