import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setLoading, setLeagues, setSelectedLeague } from "./leaguereducer";

//check if current user has a league
// show current leagues with options to change
// show option to create new league
const ShowLeagues = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffectCalled");
    (async () => {
      await axios.get("/league/getUserLeague").then((res) => {
        console.log(res.data);
      });
    })();
  }, []);

  return (
    <div className="container text-light text-center border">
      <h1>SHOW LEAGUES</h1>
    </div>
  );
};

export default ShowLeagues;
