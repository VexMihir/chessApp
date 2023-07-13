import React from "react";
import "./style.css";
export default function UserList() {
  return (
    <>
      <div className="sideboard__userListMain">
        <h3 className="sideboard__userListTitle sideboard__userListTitle_theme">
          User List
        </h3>
        <div className="sideboard__userList sideboard__userList_theme">
          <div className="sideboard__userField">
            <h3>UserName1: Jason</h3>
            <h3>Rank 1</h3>
          </div>
          <div className="sideboard__userField">
            <h3>UserName2: Jack</h3>
            <h3>Rank 2</h3>
          </div>

          <div className="sideboard__userField">
            <h3>UserName3: Kevin</h3>
            <h3>Rank 3</h3>
          </div>

          <div className="sideboard__userField">
            <h3>UserName4: Charlie</h3>
            <h3>Rank 4</h3>
          </div>

          <div className="sideboard__userField">
            <h3>UserName2: Bob</h3>
            <h3>Rank 5</h3>
          </div>
        </div>
      </div>
    </>
  );
}
