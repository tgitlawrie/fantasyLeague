import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import CreateLeague from "./createleague";
import "./modal.css";
import { setLoading, setLeagues, setSelectedLeague } from "./leaguereducer";

//check if current user has a league
// show current leagues with options to change
// show option to create new league
const ShowLeagues = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleBGClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    return (
      <div className="modal-background" onClick={handleBGClick}>
        <div className="modal-content">
          <CreateLeague onCloseModal={closeModal} />
          {/* <button onClick={() => setShowModal(false)}>Close</button> */}
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("useEffectCalled");
    (async () => {
      await axios.get("/league/getUserLeague").then((res) => {
        console.log(res.data);
      });
    })();
  }, []);

  return (
    <div>
      {showModal ? renderModal() : null}
      <div className="container text-light text-center">
        <h1>SHOW LEAGUES</h1>
        <button onClick={() => setShowModal(true)}>Create League</button>
      </div>
    </div>
  );
};
export default ShowLeagues;
//  return (
//    <div className="container text-light text-center">
//      <h1>SHOW LEAGUES</h1>
//      <button onClick={() => setShowModal(true)}>Create League</button>
//      {showModal && (
//        <div className="modal-background border" onClick={handleBGClick}>
//          <div className="modal-content">
//            <CreateLeague />
//            <button onClick={() => setShowModal(false)}>Close</button>
//          </div>
//        </div>
//      )}
//    </div>
//  );
