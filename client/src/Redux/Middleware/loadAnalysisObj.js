import {GETANALYSIS} from "../String/analysis";
import {getAnalysisScore} from "./ServiceWorker/SFWorker";
/**
 * With help of chatGPT rephrasing and grammar checking
 * Evaluation Middleware for FEN Positions
 *
 * Purpose:
 * This middleware is responsible for retrieving evaluation information of FEN (Forsyth-Edwards Notation) string positions
 * through the Stockfish AI chess engine. It utilizes the stockfish.js script, which is an emscripten port of the Stockfish
 * chess engine, and communicates with the engine using the Universal Chess Interface (UCI) protocols.
 *
 * Calculation of Percentage Score:
 * 1. Retrieve raw centipawn score from Stockfish engine (-2000 < cp < 2000).
 * 2. Take the absolute value of the score and subtract the previous score. If it is the first score (start position), the
 *    score will be 0.
 * 3. Divide the result by 100 to obtain the percentage score.
 *
 * Performance Optimization:
 * To optimize the performance of Stockfish, the middleware leverages multiple web workers (threads) running simultaneously.
 * The results from these workers are then sorted through the index later, ensuring efficient evaluation of multiple positions
 * in parallel.
 *
 * Note:
 * While an alternative better sigmoid approach exists for calculating the percentage score, the current implementation
 * utilizes a simpler approach due to time constraints.
 */

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

        console.log("Before sorting:", arr);

        arr.sort((a,b)=>{
            const indexA = parseInt(a.index, 10);
            const indexB = parseInt(b.index, 10);
            return indexA - indexB;
        })

        console.log("After sorting:", arr);

        for (let items of arr) {
            console.log("Raw Analysis Item:", items); // Debugging line
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
                ret.displayScore.push((Number(ret.offsetScore[index]) / 100) * -1);
                ret.label.push(label)
            } else if (!isNaN(ret.mateIn[index])) {
                if (ret.rawScore[Number(index) -1] !== 2000 ||  ret.rawScore[Number(index) -1] !== -2000) {
                    if (Number(index) % 2 === 0) {
                        ret.rawScore[index] = 2000;
                    } else {
                        ret.rawScore[index] = -2000;
                    }
                } else {
                    ret.rawScore[index] = ret.rawScore[Number(index) -1];
                    ret.offsetScore[index] = 2000;
                }
                ret.displayScore.push(`M${ret.mateIn[index]}`);
                let label = labelingHelper(ret.rawScore, ret.mateIn);
                ret.label.push(label)
            }
        }

        if (action.payload.includes("White wins by")) {
            ret.displayScore.push("1-0");
            ret.rawScore.push("CHECKMATE");
            ret.bestMoves.push("CHECKMATE")
        } else if (action.payload.includes("Black wins by")) {
            ret.displayScore.push("0-1");
            ret.rawScore.push("CHECKMATE");
            ret.bestMoves.push("CHECKMATE")
        } else if (action.payload.includes("Draw")) {
            ret.displayScore.push("1/2-1/2");
            ret.rawScore.push("DRAW");
            ret.bestMoves.push("DRAW")
        }

        console.log("Evaluations:", ret);

        action.payload = ret;
        return next(action)
    }
    return next(action)
}

const calculatePercentageScore = (ret, index) => {
    let score = (ret[Number(index)] - ret[Number(index) - 1]) / 100;
    if (index === 1) {
        score = ret[Number(index)] / 100;
    }
    return score
}

const labelingHelper = (offset, mateInScore) => {
    if (offset === Infinity && mateInScore) {
        return `BLACK FORCE MATE IN ${mateInScore}`
    } else if (offset === - Infinity && mateInScore) {
        return `WHITE FORCE MATE IN ${mateInScore}`
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