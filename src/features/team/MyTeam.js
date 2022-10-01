import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { PlayerCard } from "../playerCard/PlayerCard";
import "./myTeam.css";

const MyTeam = () => {
  const team = useSelector((state) => state.team.team, shallowEqual);

  const cCard = PlayerCard(team.C);
  const lwCard = PlayerCard(team.LW);
  const rwCard = PlayerCard(team.RW);
  const ldCard = PlayerCard(team.LD);
  const rdCard = PlayerCard(team.RD);
  const gCard = PlayerCard(team.G);

  return (
    <div className="board line">
      <div className="" id="left-w">
        {lwCard}
      </div>
      <div className="" id="center">
        {cCard}
      </div>
      <div className="" id="right-w">
        {rwCard}
      </div>
      <div className="" id="left-d">
        {ldCard}
      </div>
      <div className="" id="right-d">
        {rdCard}
      </div>
      <div className="" id="g">
        {gCard}
      </div>
    </div>
  );
};

export default MyTeam;
