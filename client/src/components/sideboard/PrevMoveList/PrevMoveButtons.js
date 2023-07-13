import { useState } from "react";

export function PrevListMoveButtons() {
  let style = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridColumnGap: "2px",
    margin: "5px 1px 5px 1px",
  };
  let childStyle = {
    fontSize: "larger",
  };
  function handlePrev(e) {
    e.preventDefault();
  }

  function handleNext(e) {
    e.preventDefault();
  }

  return (
    <div className={"PreMoveList"} id={"PrevListMoveButtons"} style={style}>
      <button
        id={"PrevButtonP"}
        onClick={(e) => {
          handlePrev(e);
        }}
        style={childStyle}
      >
        Prev
      </button>
      <button
        id={"NextButtonP"}
        onClick={(e) => handleNext(e)}
        style={childStyle}
      >
        Next
      </button>
    </div>
  );
}
