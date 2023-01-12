//TODO implement admin check.
import React from "react";
import { ScorePanel } from "./scorePanel";
import "./controlpanel.css";

const ControlPanel = () => {
  return (
    <div className="body">
      <h1>CONTROL PANEL</h1>
      <div className="container bg-dark-subtle h-100 w-100">
        <ScorePanel />
      </div>
    </div>
  );
};

export default ControlPanel;
