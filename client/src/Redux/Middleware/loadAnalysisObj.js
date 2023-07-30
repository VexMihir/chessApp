import {LOADGAME} from "../String/prevGameViewInit";
import {GETANALYSIS} from "../String/analysis";
import {getAnalysisScore} from "./ServiceWorker/SFWorker";
const ret = {
    displayScore: [],
    bestMoves: [],
    rawScore: [],
    label: []
}

export const loadAnalysisObj = store => next => async action => {
    let arr = []

    if (action.type === GETANALYSIS) {
        const fenStrArr = JSON.parse(store.getState().PrevGameView.PGNOBJ).prevMoveListFEN
        for (let index in fenStrArr) {
            arr.push(await getAnalysisScore(fenStrArr[index], index))
        }
        for (let items of arr) {
            ret.bestMoves.push(items.bestMove);
            ret.rawScore.push(items.rawScore)
        }

        for (let index in ret.rawScore) {
            if (Number(index) === 0) {
                ret.displayScore.push(0);
                ret.label.push("OK")
            } else {
                let percentScore = calculatePercentageScore(ret.rawScore, index);
                let label = labelingHelper(percentScore);
                ret.displayScore.push(percentScore);
                ret.label.push(label)
            }
        }
        action.payload = ret;
        return next(action)
    }
    return next(action)
}

const calculatePercentageScore = (ret, index) => {
    let score = (ret[index] - ret[index -1])/100;
    return score
}

const labelingHelper = (ret, offset) => {
    if (offset === 0) {
        return "BEST MOVE";
    } else if (offset < 0.02) {
       return "EXCELLENT";
    } else if (offset >= 0.02 && offset < 0.05) {
        return "GOOD";
    } else if (offset >= 0.05 && offset < 0.1) {
        return "INACCURACY";
    }  else if (offset >= 0.1 && offset < 0.20) {
        return "MISTAKE";
    } else {
       return "BLUNDER";
    }
}
