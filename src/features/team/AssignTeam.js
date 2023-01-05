import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlayerCard } from "../playerCard/PlayerCard";
import { setDraftStage, saveNewTeam } from "./draftSlice";
import { useNavigate } from "react-router-dom";
import { GoalieCard } from "../playerCard/GoalieCard";

const AssignTeam = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const name = useSelector((state) => state.draft.newTeam.name);
  const complete = useSelector((state) => state.draft.isDraftComplete);
  const userID = useSelector((state) => state.login.user);
  const team = useSelector((state) => state.draft.newTeam);
  const logoID = useSelector((state) => state.draft.newTeam.logo);

  const C = useSelector((state) => state.draft.newTeam.C);
  const LW = useSelector((state) => state.draft.newTeam.LW);
  const RW = useSelector((state) => state.draft.newTeam.RW);
  const LD = useSelector((state) => state.draft.newTeam.LD);
  const RD = useSelector((state) => state.draft.newTeam.RD);
  const G = useSelector((state) => state.draft.newTeam.G);

  const handleClick = (draftPosition) => {
    // 1: tutorial, 2: team info, 3:C, 4:LW, 5:RW, 6:LD, 7:RD, 8:G, 9: complete
    dispatch(setDraftStage(draftPosition));
  };

  const renderSubmit = () => {
    if (complete) {
      return (
        <button className="btn btn-outline-light" onClick={() => onTeamSave()}>
          Create Team
        </button>
      );
    }
  };

  let payload = {};
  const onTeamSave = () => {
    const tempTeam = JSON.parse(JSON.stringify(team));
    payload = Object.assign(tempTeam, { user: userID });
    console.log(payload);
    dispatch(saveNewTeam(payload));
    Navigate("/");
  };

  const renderC = () => {
    if (Object.keys(C).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(3)}>
            <PlayerCard player={C} />
          </div>
        </>
      );
    }
  };

  const renderLW = () => {
    if (Object.keys(LW).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(4)}>
            <PlayerCard player={LW} />
          </div>
        </>
      );
    }
  };

  const renderRW = () => {
    if (Object.keys(RW).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(5)}>
            <PlayerCard player={RW} />
          </div>
        </>
      );
    }
  };

  const renderLD = () => {
    if (Object.keys(LD).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(6)}>
            <PlayerCard player={LD} />
          </div>
        </>
      );
    }
  };

  const renderRD = () => {
    if (Object.keys(RD).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(7)}>
            <PlayerCard player={RD} />
          </div>
        </>
      );
    }
  };

  const renderG = () => {
    if (Object.keys(G).length !== 0) {
      return (
        <>
          <div className="col" onClick={() => handleClick(8)}>
            <GoalieCard player={G} />
          </div>
        </>
      );
    }
  };

  return (
    <div className="container">
      <h2>{name}</h2>
      <img src={logoID} />
      <div className="row"></div>
      <div className="row">
        <div className="col">{renderC()}</div>
        <div className="col">{renderLW()}</div>
        <div className="col">{renderRW()}</div>
        <div className="col">{renderLD()}</div>
        <div className="col">{renderRD()}</div>
        <div className="col">{renderG()}</div>
      </div>
      <div className="row">{renderSubmit()}</div>
    </div>
  );
};

export default AssignTeam;
