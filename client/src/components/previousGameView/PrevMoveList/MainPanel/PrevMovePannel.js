import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function PrevMoveListPannel({ prop }) {
  const navigate = useNavigate()
  let LANArr = prop.LANMoveList;

  if (!LANArr || LANArr.length === 0) {
    navigate(-1);
  }

  let currIndex = useSelector(state=>state.PrevGameView.currIdx);
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
   <div className={"h-[16rem] m-[1rem] w-[95%] overflow-scroll bg-custom-black rounded-lg bg-gradient-to-t  "}>
     <table className={" border-collapse w-[100%] max-h-[10rem] border border-transparent overflow-scroll m-[1rem] " +
         "bg-custom-black  "}>
       <tbody>
       {
         indexArr.map((child, index)=> {
           let temp = currInCre;
           currInCre = currInCre + 1;
           return (
               <tr key={index} className={"h-[1rem] p-[0.25rem]"}>
                 <td className={"h-[1rem] p-[0.25rem]"}>{child}</td>
                 <td className="h-[1rem] p-[0.25rem]">{getFirstMove(child + temp)}</td>
                 <td className="h-[1rem] p-[0.25rem]">{getSecondMove(child + temp)}</td>
               </tr>
           )
         })
       }
       </tbody>
     </table>
   </div>
  );
}
