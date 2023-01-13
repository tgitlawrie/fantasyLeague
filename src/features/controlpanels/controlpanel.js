//TODO implement admin check.
import React from "react";
import { ScorePanel } from "./scorePanel";
import { ScoreUpdate } from "./ScoreUpdate";
import "./controlpanel.css";

//TODO make toasts or some sort of notification for sucess or failure
// and also get confirmation for changing

const ControlPanel = () => {
  return (
    <div className="body">
      <h1>CONTROL PANEL</h1>
      <div className="container bg-dark-subtle h-100 w-100">
        <div className="row">
          <div className="col">
            <ScorePanel />
          </div>
          <div className="col">
            <ScoreUpdate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
