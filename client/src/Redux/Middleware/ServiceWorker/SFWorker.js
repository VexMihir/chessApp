
export async function getAnalysisScore(fenStr, index) {
    const OFFSET = -1;
    let worker = new Worker("/stockfish.js");
    let ret = {
        bestMove: undefined,
        rawScore: undefined,
        offsetScore: undefined,
        mateIn: "unavailable"
    }

    return new Promise ((resolve, reject) => {
        try {
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
                if (!bestMove || bestMove.length === 0) {
                    ret.bestMove = "unavailable"
                } else {
                    ret.bestMove = bestMove[0];
                }
                if (ret.bestMove && ret.rawScore && ret.offsetScore) {
                    resolve(ret);
                }
            }

            const onRawScore = (data) => {
                let score = data.match(/(?<=cp\s+).*?(?=\s+nodes)/gs);
                if (score) {
                    ret.rawScore = parseInt(score[0]);
                    ret.offsetScore = parseInt(score[0]);
                    if (index % 2 !== 0 ) {
                        ret.offsetScore *= OFFSET;
                    }
                }


                let mate = data.match(/(?<=mate\s+).*?(?=\s+nodes)/gs);
                if (mate != null) {
                    mate = parseInt(mate[0]);
                    ret.rawScore = Math.sign(mate) * Infinity;
                    ret.offsetScore = Math.sign(mate) * Infinity
                    if (index % 2 !== 0 ) {
                        ret.offsetScore *= OFFSET;
                    }
                    ret.mateIn = mate;
                }
                if (ret.bestMove && ret.rawScore && ret.offsetScore) {
                    resolve(ret);
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}