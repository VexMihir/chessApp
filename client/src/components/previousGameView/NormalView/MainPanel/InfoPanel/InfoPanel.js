export function InfoPanel({prop}) {
    const playerOne = prop.playerOne;
    const playerTwo = prop.playerTwo;
    const date = prop.date;
    const numberOfMoves = prop.numberOfMoves;
    const result = prop.result

    return (
        <div
            className={"h-[100%] text-sm grid grid-cols-2 px-[1rem] py-[0.5rem] "}
        >
            <span><span className={"font-bold text-yellow-500"}>Player One</span>: {playerOne} </span>
            <span><span className={"font-bold text-yellow-500"}>Player Two</span>: {playerTwo}</span>
            <span><span className={"font-bold text-yellow-500"}>Date</span>: {date}</span>
            <span><span className={"font-bold text-yellow-500"}>Number of moves</span>: {numberOfMoves}</span>
            <span><span className={"font-bold text-yellow-500"}>Result</span>: {result}</span>
        </div>
    )
}