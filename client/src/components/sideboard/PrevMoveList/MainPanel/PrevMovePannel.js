import "./PrevMoveListPanel.css"
import {useSelector} from "react-redux";

export function PrevMoveListPannel({ prop }) {

  let LANArr = prop.LANMoveList;
  let currIndex = useSelector(state=>state.PrevGameViewReducer.currIdx);
  let indexArr = [];
  let i = 1;
  let currInCre = 0

  for (let items in LANArr) {
    if (items % 2 !== 0) {
      indexArr.push(i)
      i++;
    }
  }

  function getFirstMove(index) {
    let firstMove = LANArr[index];
    if (index === currIndex) {
      firstMove = <mark>{firstMove}</mark>
    }
    return firstMove;
  }

  function getSecondMove(index) {
    let secondMove = "";
    if (LANArr[index+1]) {
      secondMove = LANArr[index+1];
      if (index+1 === currIndex) {
        secondMove = <mark>{secondMove}</mark>
      }
    }
    return secondMove
  }
  return (
    <table>
      <tbody>
        {
          indexArr.map((child, index)=> {
            let temp = currInCre;
            currInCre = currInCre + 1;
            return (
                <tr key={index}>
                  <td>{child}</td>
                  <td>{getFirstMove(child + temp)}</td>
                  <td>{getSecondMove(child + temp)}</td>
                </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}
