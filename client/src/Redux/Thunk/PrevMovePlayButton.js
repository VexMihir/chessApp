import {indiPieceUpdate} from "../Action/prevGamViewActions";

export function loadPageContinuously() {
    return async (dispatch, getState) => {
            try {
                await loading(6);
                let flag = getState().PrevGameView.playStatus;
                if (flag){
                    dispatch(indiPieceUpdate(1))
                }
            } catch (error) {
                console.log(error.message)
            }
    }
}

function loading(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 100);
    });
}
