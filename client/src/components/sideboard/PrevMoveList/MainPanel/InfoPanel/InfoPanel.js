export function InfoPanel({prop}) {

    const playerOne = prop.playerOne;
    const playerTwo = prop.playerTwo;
    const date = prop.date;
    const numberOfMoves = prop.numberOfMoves;
    return (
        <div>
            <p>Player One: {playerOne}</p>
            <p>Player Two: {playerTwo}</p>
            <p>Date: {date}</p>
            <p>Number of moves: {numberOfMoves}</p>
        </div>
    )
}