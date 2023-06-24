class chessUtils {
    //Source: https://react-dnd.github.io/react-dnd/docs/tutorial
    static getKnightValidMove(dx, dy) {
        return (Math.abs(dx) === 2 && Math.abs(dy) === 1 || Math.abs(dx) === 1 && Math.abs(dy) === 2)
    }

    static getPawnValidMove(isWhite, dx, dy) {
        console.log("line 8", dy)
        if (isWhite) {
            return dy === -1 && dx === 0
        } else {
            return dy === 1 && dx === 0
        }
    }

    static getKingValidMove(dx, dy) {
        return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
               Math.abs(dx) === 1 && Math.abs(dy) === 1
    }

    static getRookValidMove(dx, dy) {

        // if(upBlock === 0 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return  Math.abs(dx) === 0 && dy === -1 || 
        //             Math.abs(dx) === 0 && dy === -2 ||
        //             Math.abs(dx) === 0 && dy === -3 ||
        //             Math.abs(dx) === 0 && dy === -4 ||
        //             Math.abs(dx) === 0 && dy === -5 ||
        //             Math.abs(dx) === 0 && dy === -6 ||
        //             Math.abs(dx) === 0 && dy === -7 
        // }

        // if(upBlock === 1 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return false
        // }

        // if(upBlock === 2 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return Math.abs(dx) === 0 && dy === -1 
        // }

        // if(upBlock === 3 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return Math.abs(dx) === 0 && dy === -1 || 
        //            Math.abs(dx) === 0 && dy === -2 
        // }

        // if(upBlock === 4 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return  Math.abs(dx) === 0 && dy === -1 || 
        //             Math.abs(dx) === 0 && dy === -2 ||
        //             Math.abs(dx) === 0 && dy === -3 
        // }

        // if(upBlock === 5 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return  Math.abs(dx) === 0 && dy === -1 || 
        //             Math.abs(dx) === 0 && dy === -2 ||
        //             Math.abs(dx) === 0 && dy === -3 ||
        //             Math.abs(dx) === 0 && dy === -4 
        // }

        // if(upBlock === 6 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return  Math.abs(dx) === 0 && dy === -1 || 
        //             Math.abs(dx) === 0 && dy === -2 ||
        //             Math.abs(dx) === 0 && dy === -3 ||
        //             Math.abs(dx) === 0 && dy === -4 ||
        //             Math.abs(dx) === 0 && dy === -5 
        // }

        // if(upBlock === 7 && leftBlock === 1 && downBlock === 0 && rightBlock === 0) {
        //     return  Math.abs(dx) === 0 && dy === -1 || 
        //             Math.abs(dx) === 0 && dy === -2 ||
        //             Math.abs(dx) === 0 && dy === -3 ||
        //             Math.abs(dx) === 0 && dy === -4 ||
        //             Math.abs(dx) === 0 && dy === -5 ||
        //             Math.abs(dx) === 0 && dy === -6 
        // }

        return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 2 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 3 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 4 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 5 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 6 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 7 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 2 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 3 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 4 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 5 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 6 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 7 
    }

    static getBishopValidMove(dx, dy) {
        // rightUpBlock leftUpBlock leftDownBlock rightDownBlock

        return Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
               Math.abs(dx) === 2 && Math.abs(dy) === 2 ||
               Math.abs(dx) === 3 && Math.abs(dy) === 3 ||
               Math.abs(dx) === 4 && Math.abs(dy) === 4 ||
               Math.abs(dx) === 5 && Math.abs(dy) === 5 ||
               Math.abs(dx) === 6 && Math.abs(dy) === 6 ||
               Math.abs(dx) === 7 && Math.abs(dy) === 7 
 
    }

    static getQueenValidMove(dx, dy) {
        // both rook and queen

        return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 2 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 3 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 4 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 5 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 6 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 7 && Math.abs(dy) === 0 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 2 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 3 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 4 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 5 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 6 ||
        Math.abs(dx) === 0 && Math.abs(dy) === 7 || 
        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
        Math.abs(dx) === 2 && Math.abs(dy) === 2 ||
        Math.abs(dx) === 3 && Math.abs(dy) === 3 ||
        Math.abs(dx) === 4 && Math.abs(dy) === 4 ||
        Math.abs(dx) === 5 && Math.abs(dy) === 5 ||
        Math.abs(dx) === 6 && Math.abs(dy) === 6 ||
        Math.abs(dx) === 7 && Math.abs(dy) === 7 
    }

    

}

export default chessUtils