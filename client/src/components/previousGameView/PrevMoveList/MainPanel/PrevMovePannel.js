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
      firstMove = <div className={"text-yellow-300 p-[0.25rem]"}>{firstMove}</div>
    }
    return firstMove;
  }

  function getSecondMove(index) {
    let secondMove = "";
    if (LANArr[index+1]) {
      secondMove = LANArr[index+1];
      if (index+1 === currIndex) {
        secondMove = <div className={"text-yellow-300 p-[0.25rem]"}>{secondMove}</div>
      }
    }
    return secondMove
  }
  return (
     <table className={"table-fixed border-collapse w-[95%] border border-transparent m-[1rem] " +
         "overflow-hidden " +
         "bg-custom-black  "}>

       <colgroup>
         <col className={"w-[10%]"} />
         <col className={"w-[40%]"} />
         <col className={"w-[40%]"} />
       </colgroup>

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
  );
}
