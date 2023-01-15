import { React, useEffect, useState } from "react";
import axios from "axios";

export const Weekly = () => {
  const [top5, setTop5] = useState({});

  useEffect(() => {
    (async () => {
      setTop5(await axios.get("/user/top/weekly"));
    })();
  });

  return (
    <ul>
      <li>player1</li>
      <li>player2</li>
      <li>player3</li>
      <li>player4</li>
      <li>player5</li>
    </ul>
  );
};
