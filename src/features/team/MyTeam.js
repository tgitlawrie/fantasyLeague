import React from "react";
import { useSelector } from "react-redux";
import { PlayerCard } from "../playerCard/PlayerCard";
import "./myTeam.css";

const MyTeam = () => {
  const team = useSelector((state) => state.team.team);

  return (
    <div className="board line">
      <div className="" id="left-w">
        {<PlayerCard player={team.LW} />}
      </div>
      <div className="" id="center">
        {<PlayerCard player={team.C} />}
      </div>
      <div className="" id="right-w">
        {<PlayerCard player={team.RW} />}
      </div>
      <div className="" id="left-d">
        {<PlayerCard player={team.LD} />}
      </div>
      <div className="" id="right-d">
        {<PlayerCard player={team.RD} />}
      </div>
      <div className="" id="g">
        {<PlayerCard player={team.G} />}
      </div>
    </div>
  );
};

export default MyTeam;
