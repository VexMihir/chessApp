import {GETANALYSIS} from "../String/analysis";
import {getAnalysisScore} from "./ServiceWorker/SFWorker";
//things
export const loadAnalysisObj = store => next => async action => {

    if (action.type === GETANALYSIS) {
        let arr = []

        let ret = {
            loaded: false,
            offsetScore: [],
            mateIn: [],
            displayScore: [],
            bestMoves: [],
            rawScore: [],
            label: []
        }

        const fenStrArr = JSON.parse(store.getState().PrevGameView.PGNOBJ).prevMoveListFEN
        for (let index in fenStrArr) {
            if (Number(index) === fenStrArr.length - 1 && action.payload.includes("wins by Checkmate")) {
                continue;
            }
            arr.push(getAnalysisScore(fenStrArr[index], index))
        }
        arr = await Promise.all(arr);

        arr.sort((a,b)=>{
            if (a.index > b.index) {
                return 1;
            } else if (a.index < b.index) {
                return -1;
            } else {
                return 0;
            }
        })
        for (let items of arr) {
            ret.bestMoves.push(items.bestMove);
            ret.rawScore.push(items.rawScore)
            ret.mateIn.push(items.mateIn);
            ret.offsetScore.push(items.offsetScore);
            items.worker.terminate();
        }

        for (let index in ret.rawScore) {
            if (Number(index) === 0) {
                ret.displayScore.push(0);
                ret.rawScore[0] = 0;
                ret.offsetScore[0] = 0;
                ret.label.push("OK");
                continue;
            } else if (!isNaN(ret.rawScore[index]) && ret.rawScore[index] !== Infinity && ret.rawScore[index] !== - Infinity) {
                let percentScore = calculatePercentageScore(ret.offsetScore, index);
                let label = labelingHelper(percentScore);
                ret.displayScore.push(percentScore);
                ret.label.push(label)
            } else if (!isNaN(ret.mateIn[index])) {
                ret.displayScore.push(Math.sign(ret.rawScore[index]) * 8);
                let label = labelingHelper(ret.rawScore, ret.mateIn);
                ret.label.push(label)
            }
        }

        if (action.payload.includes("White wins by Checkmate")) {
            ret.displayScore.push(1);
            ret.rawScore.push("CHECKMATE");
            ret.bestMoves.push("CHECKMATE")
        } else if (action.payload.includes("Black wins by Checkmate")) {
            ret.displayScore.push(-1);
            ret.rawScore.push("CHECKMATE");
            ret.bestMoves.push("CHECKMATE")
        }
        action.payload = ret;
        return next(action)
    }
    return next(action)
}

const calculatePercentageScore = (ret, index) => {
    let score = (ret[Number(index)] - ret[Number(index) -1])/100;
    if (index === 1) {
        score = ret[Number(index)] / 100;
    }
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
