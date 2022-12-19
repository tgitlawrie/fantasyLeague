import React, { useEffect, useState, Component } from "react";
import { useDispatch } from "react-redux";
import { setLogo } from "../team/draftSlice";
import axios from "axios";
import "./logos.css";

const Logos = () => {
  const dispatch = useDispatch();

  const [allLogos, setAllLogos] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    //gets all logos from server
    async function getLogos() {
      const logos = await axios.get("/users/logos");
      setAllLogos(logos.data);
    }
    getLogos();
  }, []);

  const handleBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < allLogos.length / 4 - 1) setPage(page + 1);
  };

  const renderLogos = (page) => {
    // slice section of logos pass id for dispatch
    return allLogos.slice((page - 1) * pageSize, page * pageSize).map((n) => {
      return (
        <div className="col" key={n.id}>
          <img
            className="logo"
            src={n.url}
            alt=""
            height={100}
            onClick={() => dispatch(setLogo(n.url))}
          />
        </div>
      );
    });
  };
  return (
    <div>
      <h1>LOGOS</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-outline-light mt-5"
              type="button"
              onClick={handleBack}
            >
              &lt;
            </button>
          </div>
          {renderLogos(page)}
          <div className="col">
            <button
              className="btn btn-outline-light mt-5"
              type="button"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
