import React, { useState } from "react";
import { PlayerCard } from "../playerCard/PlayerCard";
import "./myTeam.css";

const MyTeam = () => {
  const [LW, setLW] = useState({});
  const [RW, setRW] = useState({});
  const [C, setC] = useState({});
  const [LD, setLD] = useState({});
  const [RD, setRD] = useState({});

  const cCard = PlayerCard("C");
  const lwCard = PlayerCard("LW");
  const rwCard = PlayerCard("RW");
  const ldCard = PlayerCard("LD");
  const rdCard = PlayerCard("RD");
  const gCard = PlayerCard("G");

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

/* <div className="board">
  <div className="col-lg-10 h-100 offset-1">
    <div className="row h-25 m-0">
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
    </div>
    <div className="row h-25 m-0">
      <div className="col d-flex align-items-center justify-content-end">
        {lwCard}
      </div>
      <div className="col d-flex align-items-center justify-content-center">
        {cCard}
      </div>
      <div className="col d-flex align-items-center">{rwCard}</div>
    </div>
    <div className="row h-25 m-0">
      <div className="col d-flex align-items-center justify-content-end">
        {ldCard}
      </div>
      <div className="col"></div>
      <div className="col d-flex align-items-center">{rdCard}</div>
    </div>
    <div className="row h-25 m-0">
      <div className="col"></div>
      <div className="col align-items">{gCard}</div>
      <div className="col"></div>
    </div>
  </div>
</div>; */
