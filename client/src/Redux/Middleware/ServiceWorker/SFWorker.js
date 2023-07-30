import {wait} from "@testing-library/user-event/dist/utils";

export async function getAnalysisScore(fenStr, index) {
    let worker = new Worker("/stockfish.js");
    let ret = {
        bestMove: undefined,
        rawScore: undefined,
        mateIn: "unavailable"
    }

    worker.addEventListener("message", (e) => {
        const data = e.data

        if (data.startsWith("bestmove")) {
            onBestMove(data)
        } else if (data.startsWith("info depth 16") &&
            !data.includes('lowerbound') &&
            !data.includes('upperbound')) {
            onRawScore(data)
        }
    })

    worker.postMessage(`position fen ${fenStr}`);
    worker.postMessage("go depth 16");

    /* Helper functions
     */

    const onBestMove = (data) => {
        const bestMove = data.match(/(?<=bestmove\s+).*?(?=\s+ponder)/gs)
        if (!bestMove || bestMove.length === 0|| bestMove === null) {
            ret.bestMove = "unavailable"
        } else {
            ret.bestMove = bestMove[0];
        }
    }

    const onRawScore = (data) => {
        const score = data.match(/(?<=cp\s+).*?(?=\s+nodes)/gs);
        if (score) {
            ret.rawScore = parseInt(score[0])
        }


        const mate = data.match(/(?<=mate\s+).*?(?=\s+nodes)/gs);
        if (mate != null) {
            ret.mateIn = parseInt(mate[0])
            ret.rawScore = Infinity
        }
    }

    await wait(2000);

    return ret;

}