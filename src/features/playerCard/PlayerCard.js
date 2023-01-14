import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./playerCard.css";
import { expandOff, expandOn } from "./playerCardSlice";

//TODO Fix hover on mobile

export const PlayerCard = ({ player }) => {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.playercard.expanded);
  const [expandLocked, setExpandLocked] = useState(false);
  const handleMouseOver = () => {
    dispatch(expandOn());
  };

  const handleMouseOut = () => {
    dispatch(expandOff());
  };

  const HoverRender = () => {
    if (expanded) {
      return (
        <div className="row">
          <div className="card-text col-md-6 d-flex justify-content-end">
            <ul className="no-bullets">
              <li>{`GP: ${player.gamesPlayed}`}</li>
              <li>{`A: ${player.assists}`}</li>
              <li>{`PPG: ${player.ppGoals}`}</li>
              <li>{`SHG ${player.shGoals}`}</li>
              <li>{`PIM: ${player.penaltyMins}`}</li>
            </ul>
          </div>
          <div className="card-text col-md-6 d-flex justify-content-start">
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
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => handleMouseOut()}
    >
      <div className="card-body text-dark p-0">
        <h5 className="card-title display-6">{player.position}</h5>
        <h6 className="card-title display-9">{`${player.number} ${player.firstName} ${player.lastName}`}</h6>
        <HoverRender />
      </div>
    </div>
  );
};
