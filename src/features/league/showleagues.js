import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateLeague from "./createleague";
import "./modal.css";
import { setLoading, setLeagues, setSelectedLeague } from "./leaguereducer";

//check if current user has a league
// show current leagues with options to change
// show option to create new league
const ShowLeagues = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const dispatch = useDispatch();
  // const userID = useSelector((state) => state.login.user);
  const league = useSelector((state) => state.league.signedLeagues);
  const isLoading = useSelector((state) => state.league.isLoading);

  const handleSelectLeague = (league) => {
    setSelectedLeague(league);
    console.log(selectedLeague);
  };

  const renderSelectedLeague = () => {
    switch (selectedLeague) {
      case "head2head":
        return "head2head";
      case "rotisserie":
        return "rotisserie chicken";
      case "pointsLeague":
        return "points";
      case "redraft":
        return "redraft";
      default:
        return <div>No league selected</div>;
    }
  };

  const handleBGClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderLeagueMenu = () => {
    if (!isLoading) {
      return Object.keys(league).map((key) => {
        if (league[key]) {
          return (
            <li key={league[key]._id} onClick={() => handleSelectLeague(key)}>
              {league[key].leagueName}
            </li>
          );
        } else {
          return null;
        }
      });
    } else {
      return "...Loading";
    }
  };

  const renderModal = () => {
    return (
      <div className="modal-background" onClick={handleBGClick}>
        <div className="modal-content">
          <CreateLeague onCloseModal={closeModal} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      await axios.get("/league/getUserLeague").then((res) => {
        dispatch(setLeagues(res.data));
        if (!selectedLeague && res.data.length > 0) {
          console.log(res.data[0]);
          setSelectedLeague(res.data[0].leagueMode);
        }
      });
      dispatch(setLoading(false));
    })();
  }, []);

  return (
    <div>
      {showModal ? renderModal() : null}
      <div className="container-fluid text-light text-center">
        <div className="row">
          <div
            className=" col-2 bg-black bg-opacity-25 d-flex align-items-stretch"
            style={{ minHeight: "93vh" }}
          >
            <ul>
              <li>
                <button onClick={() => setShowModal(true)}>
                  Create League
                </button>
              </li>
              {renderLeagueMenu()}
            </ul>
          </div>
          <div className="col-10">
            <h1>SHOW LEAGUES</h1>
            {renderSelectedLeague()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowLeagues;
