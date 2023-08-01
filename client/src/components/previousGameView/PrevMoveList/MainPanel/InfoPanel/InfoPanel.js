export function InfoPanel({prop}) {
    const playerOne = prop.playerOne;
    const playerTwo = prop.playerTwo;
    const date = prop.date;
    const numberOfMoves = prop.numberOfMoves;
    const result = prop.result

    return (
        <div
            className={"p-[1rem] text-md "}
        >
            <p><span className={"font-bold text-yellow-500"}>Player One</span>: {playerOne}</p>
            <p><span className={"font-bold text-yellow-500"}>Player Two</span>: {playerTwo}</p>
            <p><span className={"font-bold text-yellow-500"}>Date</span>: {date}</p>
            <p><span className={"font-bold text-yellow-500"}>Number of moves</span>: {numberOfMoves}</p>
            <p><span className={"font-bold text-yellow-500"}>Result</span>: {result}</p>
        </div>
    )
}