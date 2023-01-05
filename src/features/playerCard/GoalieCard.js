import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./playerCard.css";
import { expandOff, expandOn } from "./playerCardSlice";

//TODO Fix hover on mobile

export const GoalieCard = ({ player }) => {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.playercard.expanded);
  // const [expandLocked, setExpandLocked] = useState(false);
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
              <li>{`A: ${player.minutes}`}</li>
              <li>{`PPG: ${player.wins}`}</li>
              <li>{`SHG ${player.losses}`}</li>
              <li>{`PIM: ${player.sol}`}</li>
            </ul>
          </div>
          <div className="card-text col-md-6 d-flex justify-content-start">
            <ul className="no-bullets">
              <li>{`G: ${player.sog}`}</li>
              <li>{`P: ${player.goalsAgainst}`}</li>
              <li>{`PPA: ${player.goalsAgainstAvg}`}</li>
              <li>{`SHA: ${player.savePct}`}</li>
              <li>{`AVGP: ${player.shutouts}`}</li>
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
        <h5 className="card-title display-6">G</h5>
        <h6 className="card-title display-9">{`${player.number} ${player.firstName} ${player.lastName}`}</h6>
        <HoverRender />
      </div>
    </div>
  );
};
