import React from "react";
import { useSelector } from "react-redux";
import { LeaderBoard } from "../leaderboard/Leaderboard";
import "./myTeam.css";

const MyTeam = () => {
  const team = useSelector((state) => state.team.team);
  return (
    <div className="board line">
      <div className="icelogo">
        <img src={team.logo} />
      </div>
      <div>
        <LeaderBoard />
      </div>
      <div className="position" id="left-w">
        LW
      </div>
      <div className="name" id="left-w">
        {team.LW.firstName + " " + team.LW.lastName}
      </div>
      <div className="position" id="center">
        C
      </div>
      <div id="center" className="name">
        {team.C.firstName + " " + team.C.lastName}
      </div>
      <div className="position" id="right-w">
        RW
      </div>
      <div className="name" id="right-w">
        {team.RW.firstName + " " + team.RW.lastName}
      </div>
      <div className="position" id="left-d">
        LD
      </div>
      <div className="name" id="left-d">
        {team.LD.firstName + " " + team.LD.lastName}
      </div>
      <div className="position" id="right-d">
        RD
      </div>
      <div className="name" id="right-d">
        {team.RD.firstName + " " + team.RD.lastName}
      </div>
      <div className="position" id="g">
        G
      </div>
      <div className="name" id="g">
        {team.G.firstName + " " + team.G.lastName}
      </div>
    </div>
  );
};

export default MyTeam;
