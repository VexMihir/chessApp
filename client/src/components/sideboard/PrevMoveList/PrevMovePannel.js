import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function PrevMoveListPannel({ prop }) {

  const SANList = useSelector((storeState) => storeState.SANReducer);



  let childArr2 = [];
  for (let i = 0; i < SANList.length; i+=2) {
    if (SANList[i+1] === undefined) {
      childArr2.push((i/2 + 1) + ". " + SANList[i] + " --------- ?")      
    } else {
      childArr2.push((i/2 + 1) + ". " + SANList[i] + " --------- " + SANList[i+1])
    }
  }

  return (
    <div className={"PrevMoveList"} id={"PrevMoveList"} style={{height: "400px", overflowY: 'scroll', color: "black", backgroundColor: "white"}}>

      {childArr2.map((child) => {
        return (
          <>
              <p>{child + " "}</p> 
          </>
        );
      })}
    </div>
  );
}
