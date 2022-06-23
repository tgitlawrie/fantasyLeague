import React, { useState } from "react";

const MyTeam = () => {
  const [LW, setLW] = useState({});
  const [RW, setRW] = useState({});
  const [C, setC] = useState({});
  const [LD, setLD] = useState({});
  const [RD, setRD] = useState({});

  return <div style={{ marginTop: "60px" }}>My Team</div>;
};

export default MyTeam;
