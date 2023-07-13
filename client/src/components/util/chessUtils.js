import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "./FENStringUtils"

class chessUtils {

    static getClosestUpChessPiece(board, originalCoords) {
        let closestUpChessPiece = 9
        // Getting closestUpChessPiece
        for (let i = (Number(originalCoords[1])); i < 8; i++) {
            if (chessUtils.getPieceSymbolByCoords(board, originalCoords[0] + (i + 1).toString()) !== " ") {
                closestUpChessPiece = (i + 1)
                break
            }
        }
        return closestUpChessPiece
    }

    static getClosestDownChessPiece(board, originalCoords) {
        let closestDownChessPiece = 0
        // Getting closestDownChessPiece
        for (let i = (Number(originalCoords[1]) - 1); i >= 0; i--) {
            if (chessUtils.getPieceSymbolByCoords(board, originalCoords[0] + (i).toString()) !== " ") {
                closestDownChessPiece = (i)
                break
            }
        }
        return closestDownChessPiece
    }

    static getClosestRightChessPiece(board, originalCoords) {
        // Getting closestRightChessPiece
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let closestRightChessPiece = 9
        for (let i = row.findIndex((val) => val === originalCoords[0]); i < 8; i++) {
            if (chessUtils.getPieceSymbolByCoords(board, row[i+1] + originalCoords[1]) !== " " &&
                chessUtils.getPieceSymbolByCoords(board, row[i+1] + originalCoords[1]) !== undefined) {
                closestRightChessPiece = i + 1 + 1
                break
            }
        }
        return closestRightChessPiece
    }

    static getClosestLeftChessPiece(board, originalCoords) {
        // Getting closestLeftChessPiece
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let closestLeftChessPiece = 0
        for (let i = row.findIndex((val) => val === originalCoords[0]); i >= 0; i--) {
            if (chessUtils.getPieceSymbolByCoords(board, row[i-1] + originalCoords[1]) !== " " 
            && chessUtils.getPieceSymbolByCoords(board, row[i-1] + originalCoords[1]) !== undefined) {
                closestLeftChessPiece = i + 1 - 1
                break
            }
        }
        return closestLeftChessPiece
    }

    static getClosestUpRightChessPiece(board, originalCoords) {
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let closestUpRightChessPiece = 0
        let column = Number(originalCoords[1]) 
        // Getting closestUpRightChessPiece
        for (let i = row.findIndex((val) => val === originalCoords[0]); i < 8; i++) {
          column += 1

          if (chessUtils.getPieceSymbolByCoords(board, row[i+1] + String(column)) !== " " 
          && chessUtils.getPieceSymbolByCoords(board, row[i+1] + String(column)) !== undefined) {
            closestUpRightChessPiece = chessUtils.getRightDiagonalNumber(row[i+1] + String(column))
            break
          } else if (chessUtils.getPieceSymbolByCoords(board, row[i+1] + String(column)) === undefined) {
            
            if (row[i+1] === undefined) {
              closestUpRightChessPiece = column
            } else {
              closestUpRightChessPiece = chessUtils.getRightDiagonalNumber(row[i+1] + String(column))
            }
            break
          }
        }
        return closestUpRightChessPiece
    }

    static getClosestDownLeftChessPiece(board, originalCoords) {
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let column = Number(originalCoords[1])
        // Getting closestDownLeftChessPiece
        let closestDownLeftChessPiece = 0
        for (let i = row.findIndex((val) => val === originalCoords[0]); i >= 0; i--) {
          column -= 1  
          if (chessUtils.getPieceSymbolByCoords(board, row[i-1] + String(column)) !== " " 
          && chessUtils.getPieceSymbolByCoords(board, row[i-1] + String(column)) !== undefined) {
            closestDownLeftChessPiece = chessUtils.getRightDiagonalNumber(row[i-1] + String(column))
            break
          }
        }
        return closestDownLeftChessPiece
    }

    static getClosestUpLeftChessPiece(board, originalCoords) {
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let column = Number(originalCoords[1])
        // Getting closestUpLeftChessPiece
        let closestUpLeftChessPiece = 0
        for (let i = row.findIndex((val) => val === originalCoords[0]); i >= 0; i--) {
          column += 1
  
          if (chessUtils.getPieceSymbolByCoords(board, row[i-1] + String(column)) !== " " 
          && chessUtils.getPieceSymbolByCoords(board, row[i-1] + String(column)) !== undefined) {
            closestUpLeftChessPiece = chessUtils.getLeftDiagonalNumber(row[i-1] + String(column))
            break
          } else if (chessUtils.getPieceSymbolByCoords(board, row[i-1] + String(column)) === undefined) {
            if (row[i-1] === undefined) {
              closestUpLeftChessPiece = column
            } else {
              closestUpLeftChessPiece = chessUtils.getLeftDiagonalNumber(row[i-1] + String(column))
            }
            break
          }
        }
        return closestUpLeftChessPiece
    }

    static getClosestDownRightChessPiece(board, originalCoords) {
        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let column = Number(originalCoords[1])
        // Getting closestDownRightChessPiece
        let closestDownRightChessPiece = 0
        for (let i = row.findIndex((val) => val === originalCoords[0]); i < 8; i++) {
            column -= 1

            if (chessUtils.getPieceSymbolByCoords(board, row[i+1] + String(column)) !== " " 
            && chessUtils.getPieceSymbolByCoords(board, row[i+1] + String(column)) !== undefined) {

            closestDownRightChessPiece = chessUtils.getLeftDiagonalNumber(row[i+1] + String(column))
            break
            }
        }
        return closestDownRightChessPiece
    }






    static updateCurrentCastling(board) {
        const whiteLeftRookStatus = board[7][0][2]
        const whiteRightRookStatus = board[7][7][2]
        const blackLeftRookStatus = board[0][0][2]
        const blackRightRookStatus = board[0][7][2]
        const whiteKingStatus = board[7][4][2]
        const blackKingStatus = board[0][4][2]
        
        let castlingResult = ""
        
        if (whiteRightRookStatus === "1" && whiteKingStatus === "1") {
            if (board[7][7][1] === WHITE_CHESS_PIECE.ROOK[1] && board[7][4][1] === WHITE_CHESS_PIECE.KING[1]) {
            castlingResult += "K"
            }
            
        }
        
        if (whiteLeftRookStatus === "1" && whiteKingStatus === "1") {
            if (board[7][0][1] === WHITE_CHESS_PIECE.ROOK[1] && board[7][4][1] === WHITE_CHESS_PIECE.KING[1]) {
            castlingResult += "Q"
            }
        }
        
        if (blackRightRookStatus === "1" && blackKingStatus === "1") {
            if (board[0][7][1] === BLACK_CHESS_PIECE.ROOK[1] && board[0][4][1] === BLACK_CHESS_PIECE.KING[1]) {
            castlingResult += "k"
            }
        }
        
        if (blackLeftRookStatus === "1" && blackKingStatus === "1") {
            if (board[0][0][1] === BLACK_CHESS_PIECE.ROOK[1] && board[0][4][1] === BLACK_CHESS_PIECE.KING[1]) {
            castlingResult += "q"
            }
        }
        
        return castlingResult
    }

    static getRightDiagonalNumber(location) {
        // console.log("line 4", location);
        if ( location[0] === 'a' || location[1] === '1') {
            return 1
        } else if (location[0] === 'b' || location[1] === '2') {
            return 2
        } else if (location[0] === 'c' || location[1] === '3') {
            return 3
        } else if (location[0] === 'd' || location[1] === '4') {
            return 4
        } else if (location[0] === 'e' || location[1] === '5') {
            return 5
        } else if (location[0] === 'f' || location[1] === '6') {
            return 6
        } else if (location[0] === 'g' || location[1] === '7') {
            return 7
        } else if (location[0] === 'h' || location[1] === '8') {
            return 8
        }
    }

    static getLeftDiagonalNumber(location) {
        // console.log("line 25", location);
        if ( location[0] === 'h' || location[1] === '1') {
            return 1
        } else if (location[0] === 'g' || location[1] === '2') {
            return 2
        } else if (location[0] === 'f' || location[1] === '3') {
            return 3
        } else if (location[0] === 'e' || location[1] === '4') {
            return 4
        } else if (location[0] === 'd' || location[1] === '5') {
            return 5
        } else if (location[0] === 'c' || location[1] === '6') {
            return 6
        } else if (location[0] === 'b' || location[1] === '7') {
            return 7
        } else if (location[0] === 'a' || location[1] === '8') {
            return 8
        }
    }

    // chessboard, coords -> chessPiece
    // ex. "a8" -> "br"
    static getPieceSymbolByCoords(chessboard, location) {
        let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let row = ['8', '7', '6', '5', '4', '3', '2', '1']

        location.substring(1)

        for (let i = 0; i < col.length; i++) {
            if (location[0] === col[i]) {
                for (let j = 0; j < row.length; j++) {
                    console.log(location.substring(1), j, j.toString())
                    if (location.substring(1) === row[j]) {
                        return chessboard[j][i]
                    }
                }
            }
        }

    }

    // rowIndex, colIndex -> coords
    // ex. 0, 0 -> "a8"
    static getCoordsByRowCol(rowIndex, colIndex) {
        let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let row = ['8', '7', '6', '5', '4', '3', '2', '1']

        for (let i = 0; i < col.length; i++) {
            if (colIndex === i) {
                for (let j = 0; j < row.length; j++) {
                    if (rowIndex === j) {
                        return col[i] + row[j]
                    }
                }
            }
        }
        return null
    }

    static isValidCoord(location) {

        let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let row = ['1', '2', '3', '4', '5', '6', '7', '8']

        let isColFound = false;
        let isRowFound = false;
        for (let i = 0; i < col.length; i++) {
            if (location[0] === col[i]) {
                isColFound = true
            } 
        }

        if (!isColFound) {
            return false
        }

        for (let i = 0; i < row.length; i++) {
            if (location[1] === row[i]) {
                isRowFound = true
            }
        }

        if (!isRowFound) {
            return false
        }

        return true
    }



    //Source: https://react-dnd.github.io/react-dnd/docs/tutorial
    // Won't be blocked so it is valid implementation
    static getKnightValidMove(dx, dy) {
        return (Math.abs(dx) === 2 && Math.abs(dy) === 1 || Math.abs(dx) === 1 && Math.abs(dy) === 2)
    }

    
    // Finish the following impelementation
    static getRookValidMove(dx, dy, currentUpDownPiece, currentRightLeftPiece,upBlock, downBlock, rightBlock, leftBlock) {
        let numOfForwardMove = upBlock - currentUpDownPiece; // positive
        let numOfDownwardMove = downBlock - currentUpDownPiece; // negative
        let numOfRightwardMove = rightBlock - currentRightLeftPiece; // positive
        let numOfLeftwardMove = leftBlock - currentRightLeftPiece; // negative

        let result = 0

        for (let i = 1; i <= numOfForwardMove; i++) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === 0 && dy === -i)
        }

        for (let j = -1; j >= numOfDownwardMove; j--) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === 0 && dy === -j)
        }
        
        for (let k = 1; k <= numOfRightwardMove; k++) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === k && dy === 0)
        }
        
        for (let l = -1; l >= numOfLeftwardMove; l--) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === l && dy === 0)
        }

        return result
    }

    // May finish the following implementation and need to do more testing
    static getBishopValidMove(dx, dy, currentRightDiagonalPiece, currentLeftDiagonalPiece, upRightBlock, downLeftBlock, upLeftBlock, downRightBlock) {
        
        let numOfUpRightwardMove = upRightBlock - currentRightDiagonalPiece // positive
        let numOfDownLeftwardMove = downLeftBlock - currentRightDiagonalPiece // negative
        let numOfUpLeftwardMove = upLeftBlock - currentLeftDiagonalPiece // positive
        let numOfDownRightwardMove = downRightBlock - currentLeftDiagonalPiece // negative

        let result = 0

        for (let i = 1; i <= numOfUpRightwardMove; i++) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === i && dy === -i)
        }

        for (let j = -1; j >= numOfDownLeftwardMove; j--) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === j && dy === -j)
        }
        
        for (let k = 1; k <= numOfUpLeftwardMove; k++) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === -k && dy === -k)
        }
        
        for (let l = -1; l >= numOfDownRightwardMove; l--) {
            // Source: https://chat.openai.com/share/17ad1cb7-1cfc-4dc6-a942-5a35fa7ac6c6
            result |= (dx === -l && dy === -l)
        }

        return result

    }

    static getQueenValidMove(dx, dy, currentUpDownPiece, currentRightLeftPiece,upBlock, downBlock, rightBlock, leftBlock, 
        currentRightDiagonalPiece, currentLeftDiagonalPiece, upRightBlock, downLeftBlock, upLeftBlock, downRightBlock) {
        let result = 0
        result |= this.getRookValidMove(dx, dy, currentUpDownPiece, currentRightLeftPiece,upBlock, downBlock, rightBlock, leftBlock)
        result |= this.getBishopValidMove(dx, dy, currentRightDiagonalPiece, currentLeftDiagonalPiece, upRightBlock, downLeftBlock, upLeftBlock, downRightBlock)
        return result
    }
    
    static getWhitePawnValidMoveWhenStatusOne(dx, dy, numOfForwardMove, numOfUpLeftwardMove, numOfUpRightwardMove) {
        if (numOfForwardMove === 1 && numOfUpLeftwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === 0 ||
                   dx === 1 && dy === -1 ||
                   dx === -1 && dy === -1
        } else if (numOfForwardMove === 1 && numOfUpLeftwardMove === 1) {
            return dx === 0 && dy === 0 ||
                   dx === -1 && dy === -1
        } else if (numOfForwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === 0 ||
                    dx === 1 && dy === -1
        } else if (numOfForwardMove === 1) {
            return dx === 0 && dy === 0 
        } else if (numOfUpLeftwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === -1 && dy === -1 ||
                   dx === 1 && dy === -1 ||
                   dx === 0 && dy === -1 ||
                   dx === 0 && dy === -2
        } else if (numOfUpLeftwardMove === 1) {
            return dx === -1 && dy === -1 ||
                    dx === 0 && dy === -1 ||
                    dx === 0 && dy === -2
        } else if (numOfUpRightwardMove === 1) {
            return dx === 1 && dy === -1 ||
                    dx === 0 && dy === -1 ||
                    dx === 0 && dy === -2
        } else if (numOfForwardMove === 2 && numOfUpLeftwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === -1 ||
                   dx === 1 && dy === -1 ||
                   dx === -1 && dy === -1 
        } else if (numOfForwardMove === 2 && numOfUpLeftwardMove === 1) {
            return dx === 0 && dy === -1 ||
                    dx === -1 && dy === -1 
        } else if (numOfForwardMove === 2 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === -1 ||
                    dx === 1 && dy === -1 
        } else if (numOfForwardMove === 2) {
            return dx === 0 && dy === -1         
        } else {
            return dx === 0 && dy === -1 ||
                   dx === 0 && dy === -2
        }
    }

    static getWhitePawnValidMoveWhenStatusZero(dx, dy, numOfForwardMove, numOfUpLeftwardMove, numOfUpRightwardMove, numOfEnPassantForwardMove, numOfEnPassantRightLeftwardMove) {
        // console.log("line 216: getWhitePawnValidMove");
        // console.log(numOfForwardMove, numOfEnPassantForwardMove, numOfEnPassantRightLeftwardMove);
        // console.log(numOfUpLeftwardMove, numOfUpRightwardMove);
        if (numOfForwardMove === 1 && numOfEnPassantForwardMove === 1 && numOfEnPassantRightLeftwardMove === 1) {
            return dx === 1 && dy === -1 
        } else if ( numOfForwardMove === 1 && numOfEnPassantForwardMove === 1 && numOfEnPassantRightLeftwardMove === -1) {
            return dx === -1 && dy === -1 
        } else if (numOfEnPassantForwardMove === 1 && numOfEnPassantRightLeftwardMove === 1) {
            return dx === 1 && dy === -1 ||
                    dx === 0 && dy === -1 
        } else if (numOfEnPassantForwardMove === 1 && numOfEnPassantRightLeftwardMove === -1) {
            return dx === -1 && dy === -1 ||
                    dx === 0 && dy === -1 
        } else if (numOfForwardMove === 1 && numOfUpLeftwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === 0 ||
                    dx === 1 && dy === -1 ||
                    dx === -1 && dy === -1
        } else if (numOfForwardMove === 1 && numOfUpLeftwardMove === 1) {
            return dx === 0 && dy === 0 ||
                    dx === -1 && dy === -1
        } else if (numOfForwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 0 && dy === 0 ||                    
                    dx === 1 && dy === -1
        } else if (numOfForwardMove === 1) {
            return dx === 0 && dy === 0
        } else if (numOfUpLeftwardMove === 1 && numOfUpRightwardMove === 1) {
            return dx === 1 && dy === -1 ||
                    dx === -1 && dy === -1 || 
                    dx === 0 && dy === -1
        } else if (numOfUpLeftwardMove === 1) {
            return dx === -1 && dy === -1 ||
                    dx === 0 && dy === -1
        } else if (numOfUpRightwardMove === 1) {
            return dx === 1 && dy === -1 ||
                    dx === 0 && dy === -1
        } else {
            return dx === 0 && dy === -1
        }
    }

    static getBlackPawnValidMoveWhenStatusOne(dx, dy, numOfDownwardMove, numOfDownLeftwardMove, numOfDownRightwardMove) {
        // console.log("getBlackPawnValidMove");
        // console.log(numOfDownwardMove);
        // console.log(numOfDownLeftwardMove, numOfDownRightwardMove);
        if (numOfDownwardMove === -1 && numOfDownLeftwardMove === -1 && numOfDownRightwardMove === -1) {
            return dx === 0 && dy === 0 ||
                   dx === 1 && dy === 1 ||
                   dx === -1 && dy === 1
        } else if (numOfDownwardMove === -1 && numOfDownLeftwardMove === -1) {
            return dx === 0 && dy === 0 ||
                   dx === -1 && dy === 1
        } else if (numOfDownwardMove === -1 && numOfDownRightwardMove === -1) {
            return dx === 0 && dy === 0 ||
                    dx === 1 && dy === 1
        } else if (numOfDownwardMove === -1) {
            return dx === 0 && dy === 0 
        } else if (numOfDownLeftwardMove === -1 && numOfDownRightwardMove === -1) {
            return dx === -1 && dy === 1 ||
                   dx === 1 && dy === 1 ||
                   dx === 0 && dy === 1 ||
                   dx === 0 && dy === 2
        } else if (numOfDownLeftwardMove === -1) {
            return dx === -1 && dy === 1 ||
                    dx === 0 && dy === 1 ||
                    dx === 0 && dy === 2
        } else if (numOfDownRightwardMove === -1) {
            return dx === 1 && dy === 1 ||
                    dx === 0 && dy === 1 ||
                    dx === 0 && dy === 2
        } else if (numOfDownwardMove === -2 && numOfDownLeftwardMove === -1 && numOfDownRightwardMove === -1) {
            return dx === 0 && dy === 1 ||
                   dx === 1 && dy === 1 ||
                   dx === -1 && dy === 1 
        } else if (numOfDownwardMove === -2 && numOfDownLeftwardMove === -1) {
            return dx === 0 && dy === 1 ||
                    dx === -1 && dy === 1 
        } else if (numOfDownwardMove === -2 && numOfDownRightwardMove === -1) {
            return dx === 0 && dy === 1 ||
                    dx === 1 && dy === 1 
        } else if (numOfDownwardMove === -2) {
            return dx === 0 && dy === 1         
        } else {
            return dx === 0 && dy === 1 ||
                   dx === 0 && dy === 2
        }
    }

    static getBlackPawnValidMoveWhenStatusZero(dx, dy, numOfDownwardMove, numOfDownLeftwardMove, numOfDownRightwardMove, numOfEnPassantDownwardMove, numOfEnPassantRightLeftwardMove) {
        // console.log("line 298");
        // console.log(numOfDownwardMove, numOfEnPassantDownwardMove, numOfEnPassantRightLeftwardMove);
        // console.log(numOfDownLeftwardMove, numOfDownRightwardMove);
        if (numOfDownwardMove === -1 && numOfEnPassantDownwardMove === -1 && numOfEnPassantRightLeftwardMove === -1) {
            // console.log("line 300");
            return dx === 1 && dy === 1 
        } else if ( numOfDownwardMove === -1 && numOfEnPassantDownwardMove === -1 && numOfEnPassantRightLeftwardMove === -1) {
            // console.log("line 303");
            return dx === -1 && dy === 1 
        } else if (numOfEnPassantDownwardMove === -1 && numOfEnPassantRightLeftwardMove === 1) {
            // console.log("line 306");
            return dx === 1 && dy === 1 ||
                    dx === 0 && dy === 1 
        } else if (numOfEnPassantDownwardMove === -1 && numOfEnPassantRightLeftwardMove === -1) {
            // console.log("line 310");
            return dx === -1 && dy === 1 ||
                    dx === 0 && dy === 1 
        } else if (numOfDownwardMove === -1 && numOfDownLeftwardMove === -1 && numOfDownRightwardMove === -1) {
            // console.log("line 314");
            return dx === 0 && dy === 0 ||
                    dx === 1 && dy === 1 ||
                    dx === -1 && dy === 1
        } else if (numOfDownwardMove === -1 && numOfDownLeftwardMove === -1) {
            // console.log("line 319");
            return dx === 0 && dy === 0 ||
                    dx === -1 && dy === 1
        } else if (numOfDownwardMove === -1 && numOfDownRightwardMove === -1) {
            // console.log("line 323");
            return dx === 0 && dy === 0 ||                    
                    dx === 1 && dy === 1
        } else if (numOfDownwardMove === -1) {
            // console.log("line 327");
            return dx === 0 && dy === 0
        } else if (numOfDownLeftwardMove === -1 && numOfDownRightwardMove === -1) {
            // console.log("line 330");
            return dx === 1 && dy === 1 ||
                    dx === -1 && dy === 1 || 
                    dx === 0 && dy === 1
        } else if (numOfDownLeftwardMove === -1) {
            // console.log("line 335");
            return dx === -1 && dy === 1 ||
                    dx === 0 && dy === 1
        } else if (numOfDownRightwardMove === -1) {
            // console.log("line 339");
            return dx === 1 && dy === 1 ||
                    dx === 0 && dy === 1
        } else {
            // console.log("line 343");
            return dx === 0 && dy === 1
        }
    }

    static getWhitePawnValidMove(pawnStatus, dx, dy, 
        currentUpDownPiece, upBlock, 
        currentRightDiagonalPiece, upRightBlock, 
        currentLeftDiagonalPiece, upLeftBlock,
        currentRightLeftChessPiece, enPassant) {
        let numOfForwardMove = upBlock - currentUpDownPiece; // positive
        let numOfUpRightwardMove = upRightBlock - currentRightDiagonalPiece // positive
        let numOfUpLeftwardMove = upLeftBlock - currentLeftDiagonalPiece // positive

        let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let numOfEnPassantForwardMove = enPassant[1] - currentUpDownPiece
        let numOfEnPassantRightLeftwardMove = col.findIndex((e) => e === enPassant[0]) + 1 - currentRightLeftChessPiece

        if (pawnStatus === "1") {
            // when pawn status is 1 and the foward piece is 1, which is blocked
            return this.getWhitePawnValidMoveWhenStatusOne(dx, dy, numOfForwardMove, numOfUpLeftwardMove, numOfUpRightwardMove)
        } else if (pawnStatus === "0") { 
            return this.getWhitePawnValidMoveWhenStatusZero(dx, dy, numOfForwardMove, numOfUpLeftwardMove, numOfUpRightwardMove, numOfEnPassantForwardMove, numOfEnPassantRightLeftwardMove)
        }
    
    }

    static getBlackPawnValidMove(pawnStatus, dx, dy, 
        currentUpDownPiece, downBlock, 
        currentRightDiagonalPiece, downRightBlock, 
        currentLeftDiagonalPiece, downLeftBlock,
        currentRightLeftChessPiece, enPassant) {

        let numOfDownwardMove = downBlock - currentUpDownPiece; // negative
        let numOfDownLeftwardMove = downLeftBlock - currentRightDiagonalPiece // negative
        let numOfDownRightwardMove = downRightBlock - currentLeftDiagonalPiece // negative

        let col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let numOfEnPassantDownwardMove = enPassant[1] - currentUpDownPiece
        let numOfEnPassantRightLeftwardMove = col.findIndex((e) => e === enPassant[0]) + 1 - currentRightLeftChessPiece

        if (pawnStatus === "1") {
            // when pawn status is 1 and the foward piece is 1, which is blocked
            return this.getBlackPawnValidMoveWhenStatusOne(dx, dy, numOfDownwardMove, numOfDownLeftwardMove, numOfDownRightwardMove)
        } else if (pawnStatus === "0") { 
            return this.getBlackPawnValidMoveWhenStatusZero(dx, dy, numOfDownwardMove, numOfDownLeftwardMove, numOfDownRightwardMove, numOfEnPassantDownwardMove, numOfEnPassantRightLeftwardMove)
        }
    
    }


    
    // need to check if it will be checkmated.
    // 1. Castling
    // 2. Safety - checked by outside of this function? Chessboard or in other piece's valid move function?
    static getKingValidMove(dx, dy, currentRightLeftChessPiece, closestLeftChessPiece, closestRightChessPiece, castling) {
        
        const numOfLeftwardMove = closestLeftChessPiece - currentRightLeftChessPiece
        const numOfRightwardMove = closestRightChessPiece - currentRightLeftChessPiece
    
        console.log("line 446");
        console.log(currentRightLeftChessPiece, closestLeftChessPiece, closestRightChessPiece);
        console.log("line 446", numOfRightwardMove, numOfLeftwardMove);

        // Source: https://www.w3schools.com/jsref/jsref_includes.asp
        if (castling.includes("KQ") || castling.includes("kq")) {
            if (numOfRightwardMove === 3 && numOfLeftwardMove === -4) {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
                        dx === 2 && dy === 0 ||
                        dx === -2 && dy === 0
            } else if (numOfRightwardMove === 3) {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
                        dx === 2 && dy === 0
            } else if (numOfLeftwardMove === -4) {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
                        dx === -2 && dy === 0
            } else {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1
            }
        // Source: https://www.w3schools.com/jsref/jsref_includes.asp
        } else if (castling.includes("K") || castling.includes("k")) {
            if (numOfRightwardMove === 3) {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
                        dx === 2 && dy === 0 
            } else {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1
            }

        // Source: https://www.w3schools.com/jsref/jsref_includes.asp
        } else if (castling.includes("Q") || castling.includes("q")) {
            console.log("line 477:::::");
            if (numOfLeftwardMove === -4) {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1 ||
                        dx === -2 && dy === 0 
            } else {
                return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
                        Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
                        Math.abs(dx) === 1 && Math.abs(dy) === 1
            }
        }

        return Math.abs(dx) === 1 && Math.abs(dy) === 0 ||
               Math.abs(dx) === 0 && Math.abs(dy) === 1 ||
               Math.abs(dx) === 1 && Math.abs(dy) === 1
    }
    
    // check if the king is in check

    // A White King's safety system
    // return true if White King is Safe
    // return false if White King is not safe
    static isKingSafe(board,
        currentUpDownPiece, upBlock, downBlock, 
        currentRightLeftChessPiece, rightBlock, leftBlock,
        currentRightDiagonalPiece, upRightBlock, downLeftBlock, 
        currentLeftDiagonalPiece, upLeftBlock, downRightBlock) {
            
        console.log("line 656", currentUpDownPiece, currentRightLeftChessPiece, currentRightDiagonalPiece, currentLeftDiagonalPiece);
        console.log("line 657", currentUpDownPiece, upBlock, downBlock);
        console.log("line 658", currentRightLeftChessPiece, rightBlock, leftBlock);
        console.log("line 659", currentRightDiagonalPiece, upRightBlock, downLeftBlock);
        console.log("line 660", currentLeftDiagonalPiece, upLeftBlock, downRightBlock);

        const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let currentKingPieceLocation = row[currentRightLeftChessPiece - 1] + String(currentUpDownPiece)

        let upBlockCoordLocation = row[currentRightLeftChessPiece - 1] + String(upBlock)
        let downBlockCoordLocation = row[currentRightLeftChessPiece - 1] + String(downBlock)
        let rightBlockCoordLocation = row[rightBlock - 1] + String(currentUpDownPiece)
        let leftBlockCoordLocation = row[leftBlock - 1] + String(currentUpDownPiece)
        
        // RightDiagonal
        let upRightCoordLocation = row[currentRightLeftChessPiece - 1 + upRightBlock] + String(upRightBlock)
        let downLeftCoordLocation = row[currentRightLeftChessPiece - 1 - downLeftBlock] + String(downLeftBlock)

        // LeftDiagonal
        let upLeftCoordLocation = row[currentRightLeftChessPiece - 1 + upLeftBlock] + String(upLeftBlock)
        let downRightCoordLocation = row[currentRightLeftChessPiece - 1 - downRightBlock] + String(downRightBlock)

        
        // if there is a piece in front of the king
        if (upBlock !== 9) {
            // if the king's color is different from the piece return false
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upBlockCoordLocation)[0]) {
                console.log("line 686", this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0]);
                console.log("line 687", this.getPieceSymbolByCoords(board, upBlockCoordLocation)[0]);
                console.log("##### line 686");
                return false
            }
        }

        // if there is a piece in the back of the king
        if (downBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downBlockCoordLocation)[0]) {
                console.log("##### line 694");
                return false
            }
        }

        // if there is a piece on the right of the king
        if (rightBlock !== 9) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, rightBlockCoordLocation)[0]) {
                console.log("##### line 702");
                return false
            }
        }

        // if there is a piece on the left of the king
        if (leftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, leftBlockCoordLocation)[0]) {
                console.log("##### line 710");
                return false
            }
        }

        // rightDiagonal
        if ((currentKingPieceLocation === "a1" || currentKingPieceLocation === "b2" || currentKingPieceLocation === "c3" || currentKingPieceLocation === "d4" 
        || currentKingPieceLocation === "e5" || currentKingPieceLocation === "f6" || currentKingPieceLocation === "g7" || currentKingPieceLocation === "h8") 
        && upRightBlock !== 9 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 721");
                return false
            }
        }

        if ((currentKingPieceLocation === "a2" || currentKingPieceLocation === "b3" || currentKingPieceLocation === "c4" || currentKingPieceLocation === "d5" 
        || currentKingPieceLocation === "e6" || currentKingPieceLocation === "f7" || currentKingPieceLocation === "g8" 
        || currentKingPieceLocation === "b1" || currentKingPieceLocation === "c2" || currentKingPieceLocation === "d3" || currentKingPieceLocation === "e4"
        || currentKingPieceLocation === "f5" || currentKingPieceLocation === "g6" || currentKingPieceLocation === "h7") 
        && upRightBlock !== 8 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 733");
                return false
            }
        }

        if ((currentKingPieceLocation === "a3" || currentKingPieceLocation === "b4" || currentKingPieceLocation === "c5" || currentKingPieceLocation === "d6" 
        || currentKingPieceLocation === "e7" || currentKingPieceLocation === "f8" 
        || currentKingPieceLocation === "c1" || currentKingPieceLocation === "d2" || currentKingPieceLocation === "e3"
        || currentKingPieceLocation === "f4" || currentKingPieceLocation === "g5" || currentKingPieceLocation === "h6") 
        && upRightBlock !== 7 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 745");
                return false
            }
        }

        if ((currentKingPieceLocation === "a4" || currentKingPieceLocation === "b5" || currentKingPieceLocation === "c6" || currentKingPieceLocation === "d7" 
        || currentKingPieceLocation === "e8"  
        || currentKingPieceLocation === "d1" || currentKingPieceLocation === "e2"
        || currentKingPieceLocation === "f3" || currentKingPieceLocation === "g4" || currentKingPieceLocation === "h5") 
        && upRightBlock !== 6 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 757");
                return false
            }
        }

        if ((currentKingPieceLocation === "a5" || currentKingPieceLocation === "b6" || currentKingPieceLocation === "c7" || currentKingPieceLocation === "d8"   
        || currentKingPieceLocation === "e1"
        || currentKingPieceLocation === "f2" || currentKingPieceLocation === "g3" || currentKingPieceLocation === "h4") 
        && upRightBlock !== 5 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 768");
                return false
            }
        }

        if ((currentKingPieceLocation === "a6" || currentKingPieceLocation === "b7" || currentKingPieceLocation === "c8"
        || currentKingPieceLocation === "f1" || currentKingPieceLocation === "g2" || currentKingPieceLocation === "h3") 
        && upRightBlock !== 4 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 778");
                return false
            }
        }

        if ((currentKingPieceLocation === "a7" || currentKingPieceLocation === "b8" 
        || currentKingPieceLocation === "g1" || currentKingPieceLocation === "h2") 
        && upRightBlock !== 3 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 788");
                return false
            }
        }

        if ((currentKingPieceLocation === "a8" 
        || currentKingPieceLocation === "h1") 
        && upRightBlock !== 2 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upRightCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downLeftCoordLocation[0])) {
                console.log("##### line 798");
                return false
            }
        }

        // leftDiagonal
        if ((currentKingPieceLocation === "a8" || currentKingPieceLocation === "b7" || currentKingPieceLocation === "c6" || currentKingPieceLocation === "d5" 
        || currentKingPieceLocation === "e4" || currentKingPieceLocation === "f3" || currentKingPieceLocation === "g2" || currentKingPieceLocation === "h1") 
        && upLeftBlock !== 9 && downRightBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 809");
                return false
            }
        }

        if ((currentKingPieceLocation === "a7" || currentKingPieceLocation === "b6" || currentKingPieceLocation === "c5" || currentKingPieceLocation === "d4" 
        || currentKingPieceLocation === "e3" || currentKingPieceLocation === "f2" || currentKingPieceLocation === "g1" 
        || currentKingPieceLocation === "b8" || currentKingPieceLocation === "c7" || currentKingPieceLocation === "d6" || currentKingPieceLocation === "e5"
        || currentKingPieceLocation === "f4" || currentKingPieceLocation === "g3" || currentKingPieceLocation === "h2") 
        && upRightBlock !== 8 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 821");
                return false
            }
        }

        if ((currentKingPieceLocation === "a6" || currentKingPieceLocation === "b5" || currentKingPieceLocation === "c4" || currentKingPieceLocation === "d3" 
        || currentKingPieceLocation === "e2" || currentKingPieceLocation === "f1"  
        || currentKingPieceLocation === "c8" || currentKingPieceLocation === "d7" || currentKingPieceLocation === "e6"
        || currentKingPieceLocation === "f5" || currentKingPieceLocation === "g4" || currentKingPieceLocation === "h3") 
        && upRightBlock !== 7 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 833");
                return false
            }
        }

        if ((currentKingPieceLocation === "a5" || currentKingPieceLocation === "b4" || currentKingPieceLocation === "c3" || currentKingPieceLocation === "d2" 
        || currentKingPieceLocation === "e1"  
        || currentKingPieceLocation === "d8" || currentKingPieceLocation === "e7"
        || currentKingPieceLocation === "f6" || currentKingPieceLocation === "g5" || currentKingPieceLocation === "h4") 
        && upRightBlock !== 6 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 845");
                return false
            }
        }

        if ((currentKingPieceLocation === "a4" || currentKingPieceLocation === "b3" || currentKingPieceLocation === "c2" || currentKingPieceLocation === "d1"   
        || currentKingPieceLocation === "e8"
        || currentKingPieceLocation === "f7" || currentKingPieceLocation === "g6" || currentKingPieceLocation === "h5") 
        && upRightBlock !== 5 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 856");
                return false
            }
        }

        if ((currentKingPieceLocation === "a3" || currentKingPieceLocation === "b2" || currentKingPieceLocation === "c1"    
        || currentKingPieceLocation === "f8" || currentKingPieceLocation === "g7" || currentKingPieceLocation === "h6") 
        && upRightBlock !== 4 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 866");
                return false
            }
        }

        if ((currentKingPieceLocation === "a2" || currentKingPieceLocation === "b1"    
        || currentKingPieceLocation === "g8" || currentKingPieceLocation === "h7") 
        && upRightBlock !== 3 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 876");
                return false
            }
        }

        if ((currentKingPieceLocation === "a1" || currentKingPieceLocation === "h8") 
        && upRightBlock !== 2 && downLeftBlock !== 0) {
            if (this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, upLeftCoordLocation)[0] 
            || this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, downRightCoordLocation[0])) {
                console.log("##### line 885");
                return false
            }
        }

        // Knight Detection
        // let kingCoord = this.getCoordsByRowCol(8 - currentKingPieceLocation[1], col.findIndex((e) => e === currentKingPieceLocation[0])) 

        let knightOneOClockLocation = null;
        let knightTwoOClockLocation = null;
        let knightFourOClockLocation = null;
        let knightFiveOClockLocation = null;
        let knightSevenOClockLocation = null;
        let knightEightOClockLocation = null;
        let knightTenOClockLocation = null;
        let knightElevenOClockLocation = null;
        
        let rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) + 1
        let colIndex = String(Number(currentKingPieceLocation[1]) + 2)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightOneOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) + 2
        colIndex = String(Number(currentKingPieceLocation[1]) + 1)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightTwoOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) + 2
        colIndex = String(Number(currentKingPieceLocation[1]) - 1)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightFourOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) + 1
        colIndex = String(Number(currentKingPieceLocation[1]) - 2)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightFiveOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) - 1
        colIndex = String(Number(currentKingPieceLocation[1]) - 2)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightSevenOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) - 2
        colIndex = String(Number(currentKingPieceLocation[1]) - 1)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightEightOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) - 2
        colIndex = String(Number(currentKingPieceLocation[1]) + 1)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightTenOClockLocation = row[rowIndex] + colIndex;
        }

        rowIndex = row.findIndex((e) => e === currentKingPieceLocation[0]) - 1
        colIndex = String(Number(currentKingPieceLocation[1]) + 2)
        if (rowIndex >= 0 && rowIndex <= 7 && colIndex >= 1 && colIndex <= 8) {
            knightElevenOClockLocation = row[rowIndex] + colIndex;
        }

        // let knightFourOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) + 2] + String(Number(currentKingPieceLocation[1]) - 1);
        // let knightFiveOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) + 1] + String(Number(currentKingPieceLocation[1]) - 2);
        // let knightSevenOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) - 1] + String(Number(currentKingPieceLocation[1]) - 2);
        // let knightEightOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) - 2] + String(Number(currentKingPieceLocation[1]) - 1);
        // let knightTenOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) - 2] + String(Number(currentKingPieceLocation[1]) + 1);
        // let knightElevenOClockLocation = row[row.findIndex((e) => e === currentKingPieceLocation[0]) - 1] + String(Number(currentKingPieceLocation[1]) + 2);

        // if (!this.isValidCoord(knightOneOClockLocation)) {
        //     knightOneOClockLocation = null
        // }



        console.log(currentKingPieceLocation);
        console.log("line 905",  row.findIndex((e) => e === currentKingPieceLocation[0]) + 1,Number(currentKingPieceLocation[1]) + 2);

        console.log("x", knightOneOClockLocation);
        console.log("x", knightTwoOClockLocation);
        console.log("x", knightFourOClockLocation);
        console.log("x", knightFiveOClockLocation);
        console.log("x", knightSevenOClockLocation);
        console.log("x", knightEightOClockLocation);
        console.log("x", knightTenOClockLocation);
        console.log("x", knightElevenOClockLocation);


        if (knightOneOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightOneOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightOneOClockLocation)[0] !== " ") {
            console.log("##### line 903");
            return false
        }

        if (knightTwoOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightTwoOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightTwoOClockLocation)[0] !== " ") {
            console.log("##### line 908");
            return false
        }

        if (knightFourOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightFourOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightFourOClockLocation)[0] !== " ") {
            console.log("##### line 913");
            return false
        }

        if (knightFiveOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightFiveOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightFiveOClockLocation)[0] !== " ") {
            console.log("##### line 918");
            return false
        }

        if (knightSevenOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightSevenOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightSevenOClockLocation)[0] !== " ") {
            console.log("##### line 923");
            return false
        }

        if (knightEightOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightEightOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightEightOClockLocation)[0] !== " ") {
            console.log("##### line 928");
            return false
        }

        if (knightTenOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightTenOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightTenOClockLocation)[0] !== " ") {
            console.log("##### line 933");
            return false
        }

        if (knightElevenOClockLocation !== null && this.getPieceSymbolByCoords(board, currentKingPieceLocation)[0] !== this.getPieceSymbolByCoords(board, knightElevenOClockLocation)[0]
        && this.getPieceSymbolByCoords(board, knightElevenOClockLocation)[0] !== " ") {
            console.log("##### line 938");
            return false
        }

        return true
    }

    // if !isKingSafe(...) then it is in check
    // if(!isKingSafe(...) && !canKingMove(...)) then it is in checkmate

    // if cannot move 
    static canKingMove(board,
        currentUpDownPiece, upBlock, downBlock, 
        currentRightLeftChessPiece, rightBlock, leftBlock,
        currentRightDiagonalPiece, upRightBlock, downLeftBlock, 
        currentLeftDiagonalPiece, upLeftBlock, downRightBlock) {
        

        // if up square is in check(would be similar to the following) OR up sqaure is blocked by the same color chess piece (have not shown below)
        const canMoveUpward = this.isKingSafe(board,
            currentUpDownPiece + 1, upBlock, downBlock, 
            currentRightLeftChessPiece, rightBlock, leftBlock,
            currentRightDiagonalPiece + 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece + 1, upLeftBlock, downRightBlock) === false
        
        const canMoveUpRightward = this.isKingSafe(board,
            currentUpDownPiece + 1, upBlock, downBlock, 
            currentRightLeftChessPiece + 1, rightBlock, leftBlock,
            currentRightDiagonalPiece + 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece + 1, upLeftBlock, downRightBlock) === false

        const canMoveRightward = this.isKingSafe(board,
            currentUpDownPiece, upBlock, downBlock, 
            currentRightLeftChessPiece + 1, rightBlock, leftBlock,
            currentRightDiagonalPiece, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece, upLeftBlock, downRightBlock) === false

        const canMoveDownRightward = this.isKingSafe(board,
            currentUpDownPiece - 1, upBlock, downBlock, 
            currentRightLeftChessPiece + 1, rightBlock, leftBlock,
            currentRightDiagonalPiece - 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece - 1, upLeftBlock, downRightBlock) === false

        const canMoveDownward = this.isKingSafe(board,
            currentUpDownPiece - 1, upBlock, downBlock, 
            currentRightLeftChessPiece, rightBlock, leftBlock,
            currentRightDiagonalPiece - 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece - 1, upLeftBlock, downRightBlock) === false

        const canMoveDownLeftward = this.isKingSafe(board,
            currentUpDownPiece - 1, upBlock, downBlock, 
            currentRightLeftChessPiece - 1, rightBlock, leftBlock,
            currentRightDiagonalPiece - 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece - 1, upLeftBlock, downRightBlock) === false

        const canMoveLeftward = this.isKingSafe(board,
            currentUpDownPiece, upBlock, downBlock, 
            currentRightLeftChessPiece - 1, rightBlock, leftBlock,
            currentRightDiagonalPiece, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece, upLeftBlock, downRightBlock) === false

        const canMoveUpLeftward = this.isKingSafe(board,
            currentUpDownPiece + 1, upBlock, downBlock, 
            currentRightLeftChessPiece - 1, rightBlock, leftBlock,
            currentRightDiagonalPiece + 1, upRightBlock, downLeftBlock, 
            currentLeftDiagonalPiece + 1, upLeftBlock, downRightBlock) === false

            
        return canMoveUpward && canMoveUpRightward && canMoveRightward && canMoveDownRightward && canMoveDownward && canMoveDownLeftward && canMoveLeftward && canMoveUpLeftward
    }

    
    // A Black King's safety system
    // return true if Black King is safe
    // return false if Black King is not safe
    static isBlackKingSafet() {
        
    }
    
    // check if the game is in checkmate

    // ??? need?
    static canWhiteKingMove() {

    }

    // ??? need?
    static canBlackKingMove() {

    }

    static canPawnMove() {

    }

    static canKnightMove() {

    }

    static canBishopMove() {

    }

    static canQueenMove() {

    }

    static canPlayerMove() {

    }
    

}


export default chessUtils