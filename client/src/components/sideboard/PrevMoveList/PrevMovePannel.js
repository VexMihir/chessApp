import "./PrevMoveList.css"
export function PrevMoveListPannel({ prop }) {
  let moveNo = 0;
  let playerOneCollection = prop.playerOneArr;
  let playerTwoCollection = prop.playerTwoArr;
  let childArr = [];
  while (moveNo !== playerOneCollection.length) {
    let moveChildDic = {};
    moveChildDic["P1"] = playerOneCollection[moveNo];
    if(playerTwoCollection[moveNo]) {
      moveChildDic["P2"] = playerTwoCollection[moveNo];
    } else {
      moveChildDic["P2"] = "";
    }
    childArr.push(moveChildDic);
    moveNo++;
  }
  return (
    <div className={"PrevMoveList"} id={"PrevMoveListPanel"}>
      {childArr.map((child) => {
        return (
          <div id={"moveChild"} key={childArr.indexOf(child)}>
            <p id={childArr.indexOf(child) + "P1Idx"} key={childArr.indexOf(child) + "P1Idx"}>{childArr.indexOf(child) + 1}</p>
            <p id={childArr.indexOf(child) + "P1"} key={childArr.indexOf(child) + "P1"}>{child.P1}</p>
            <p id={childArr.indexOf(child) + "P2"} key={childArr.indexOf(child) + "P2"}>{child.P2}</p>
          </div>
        );
      })}
    </div>
  );
}
