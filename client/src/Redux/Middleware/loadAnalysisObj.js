import {GETANALYSIS} from "../String/analysis";
import {getAnalysisScore} from "./ServiceWorker/SFWorker";

export const loadAnalysisObj = store => next => async action => {
    if (action.type === GETANALYSIS) {
        let newRet  = {
            loaded: false,
            offsetScore: [],
            mateIn: [],
            displayScore: [],
            bestMoves: [],
            rawScore: [],
            label: []
        };

        //if (store.getState().AnalyisReducer.currIndex === action.payload) return;
        let arr = [];
        const fenStrArr = JSON.parse(store.getState().PrevGameView.PGNOBJ).prevMoveListFEN
        for (let index in fenStrArr) {
            arr.push(getAnalysisScore(fenStrArr[index], index))
        }
        arr = await Promise.all(arr);
        //race-condition guard
        arr.sort((a, b) => {
            if (Number(a.index) > Number(b.index)) {
                return 1;
            } else if (Number(a.index) < Number(b.index)) {
                return -1
            } else {
                return 0;
            }
        });

        for (let items of arr) {
            newRet.bestMoves.push(items.bestMove);
            newRet.rawScore.push(items.rawScore)
            newRet.mateIn.push(items.mateIn)
            newRet.offsetScore.push(items.offsetScore)
            items.worker.terminate();
        }

        for (let index in newRet.rawScore) {
            if (Number(index) === 0) {
                newRet.displayScore.push(0);
                newRet.label.push("OK");
                continue;
            } else if (!isNaN(newRet.rawScore[index]) && newRet.rawScore[index] !== Infinity && newRet.rawScore[index] !== - Infinity) {
                let percentScore = calculatePercentageScore(newRet.offsetScore, index);
                let label = labelingHelper(percentScore);
                newRet.displayScore.push(percentScore);
                newRet.label.push(label)
            } else if (!isNaN(newRet.mateIn[index])) {
                newRet.displayScore = Math.sign(newRet.rawScore) * 8;
                let label = labelingHelper(newRet.rawScore, newRet.mateIn);
                newRet.label.push(label)
            }
        }
        action.payload = newRet;
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
    } else if (offset < 0.2) {
       return "EXCELLENT";
    } else if (offset >= 0.2 && offset < 0.5) {
        return "GOOD";
    } else if (offset >= 0.5 && offset < 0.8)  {
        return "OK"
    } else if (offset >= 0.8 && offset < 4) {
        return "INACCURACY";
    }  else if (offset >= 4 && offset < 8) {
        return "MISTAKE";
    } else {
       return "BLUNDER";
    }
}
