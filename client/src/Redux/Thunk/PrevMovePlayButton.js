import {indiPieceUpdate} from "../Action/PGN_Actions";

export function loadPageContinuously() {
    return async (dispatch, getState) => {
            try {
                await loading(6);
                let flag = getState().PGNReducer.playStatus;
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
