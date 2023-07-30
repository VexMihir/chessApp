import {LOADGAME} from "../String/prevGameViewInit";
import {GETANALYSIS} from "../String/analysis";
import {getAnalysisScore} from "./ServiceWorker/SFWorker";
const ret = {
    offsetScore: [],
    mateIn: [],
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
            if (Number(index) === 0) continue;
            arr.push(await getAnalysisScore(fenStrArr[index], index))
        }
        for (let items of arr) {
            ret.bestMoves.push(items.bestMove);
            ret.rawScore.push(items.rawScore)
            ret.mateIn.push(items.mateIn)
            ret.offsetScore.push(items.offsetScore)
        }

        for (let index in ret.rawScore) {
            if (Number(index) === 0) {
                continue;
            } else if (!isNaN(ret.rawScore[index]) && ret.rawScore[index] !== Infinity && ret.rawScore[index] !== - Infinity) {
                let percentScore = calculatePercentageScore(ret.offsetScore, index);
                let label = labelingHelper(percentScore);
                ret.displayScore.push(percentScore);
                ret.label.push(label)
            } else if (!isNaN(ret.mateIn[index])) {
                ret.displayScore = Math.sign(ret.rawScore);
                let label = labelingHelper(ret.rawScore, ret.mateIn);
                ret.label.push(label)
            }
        }
        action.payload = ret;
        return next(action)
    }
    return next(action)
}

const calculatePercentageScore = (ret, index) => {
    let score = (ret[Number(index)] - ret[Number(index) -1])/100;
    return score
}

const labelingHelper = (offset, mateInScore) => {
    if (offset === Infinity && mateInScore) {
        return 'BLACK FORCE MATE IN ${mateInScore}'
    } else if (offset === - Infinity && mateInScore) {
        return 'WHITE FORCE MATE IN ${mateInScore}'
    }
    offset = Math.abs(offset);
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
