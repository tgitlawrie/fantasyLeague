import React, { useState } from "react";
import "./playerCard.css";

//TODO Fix hover on mobile

export const PlayerCard = (position) => {
  const [expanded, setExpanded] = useState(false);
  // hardcoded information for now
  //TODO get player information for each card should be stored in state
  const player = {
    _id: "62a56f4d6db63c925cd9861f",
    number: 88,
    firstName: "Jamin",
    lastName: "Harrex",
    team: "BULLS",
    gamesPlayed: 10,
    goals: 5,
    assists: 4,
    points: 9,
    ppGoals: 0,
    ppAssists: 0,
    shGoals: 0,
    shAssists: 0,
    penaltyMins: 6,
    avgPoints: 0,
  };

  const handleMouseOver = () => {
    setExpanded(true);
  };

  const handleMouseOut = () => {
    setExpanded(false);
  };

  const HoverRender = () => {
    if (expanded) {
      return (
        <div className="row d-flex justify-content-center">
          <div className="card-text col-md-6">
            <ul className="no-bullets">
              <li>{`GP: ${player.gamesPlayed}`}</li>
              <li>{`A: ${player.assists}`}</li>
              <li>{`PPG: ${player.ppGoals}`}</li>
              <li>{`SHG ${player.shGoals}`}</li>
              <li>{`PIM: ${player.penaltyMins}`}</li>
            </ul>
          </div>
          <div className="card-text col-md-6">
            <ul className="no-bullets">
              <li>{`G: ${player.goals}`}</li>
              <li>{`P: ${player.points}`}</li>
              <li>{`PPA: ${player.ppAssists}`}</li>
              <li>{`SHA: ${player.shAssists}`}</li>
              <li>{`AVGP: ${player.avgPoints}`}</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="card text-center border-dark mb-0"
      id="player-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="card-body text-dark p-0">
        <h5 className="card-title">{position}</h5>
        <h6 className="card-title">{`${player.number} ${player.firstName} ${player.lastName}`}</h6>
        <HoverRender />
      </div>
    </div>
  );
};
