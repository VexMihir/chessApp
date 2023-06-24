import React from "react";
import "./style.css";
import InGameView from "../inGameView/InGameView";
import { Route, Routes, NavLink } from "react-router-dom";
import PreviousGameView from "../previousGameView/PreviousGameView";
export default function Navigation(props) {
  const onClose = props.onClose;

  function handleClose(e) {
    onClose(e);
  }
  return (
    <div>
      <ul className="navigation__ul">
        <button className="navigation__button" onClick={handleClose}>
          CLOSE
        </button>
        <NavLink to="/inGameView">
          <li className="navigation__list">1. In-Game View</li>
        </NavLink>
        <NavLink to="/previousGameView">
          <li className="navigation__list">2. Previous Game View</li>
        </NavLink>
      </ul>
    </div>
  );
}
