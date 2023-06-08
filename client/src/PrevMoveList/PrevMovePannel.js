export function PrevMoveListPannel({prop}) {
    let style = {
        minHeight: 0,
        display: "grid",
        margin: "1px 1px 1px 1px",
        border: "solid black",
        gridTemplateRows: "repeat(15, 6.67%)",
        overflow: "scroll"

    }
    let childStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
    }
    let moveNo = 0;
    let playerOneCollection = prop.playerOneArr;
    let playerTwoCollection = prop.playerTwoArr;
    let childArr = []
   while(moveNo !== playerOneCollection.length) {
        let moveChildDic = {}
        moveChildDic["P1"] = playerOneCollection[moveNo];
        moveChildDic["P2"] = playerTwoCollection[moveNo];
        childArr.push(moveChildDic);
        moveNo++;
    }
    return (
        <div
            className={"PrevMoveList"}
            id={"PrevMoveList"}
            style={style}
          >{childArr.map((child) => {
            return <div
                key={childArr.indexOf(child)}
                style={childStyle}
            >
                <p key={childArr.indexOf(child)+"P1"}>{childArr.indexOf(child) + 1}. {child.P1}</p>
                <p key={childArr.indexOf(child)+"P2"}> {child.P2}</p>
            </div>
        })}</div>

    )
}