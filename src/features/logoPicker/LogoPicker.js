import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import "./logos.css";

const Logos = () => {
  const [allLogos, setAllLogos] = useState([]);

  useEffect(() => {
    async function getLogos() {
      const logos = await axios.get("/users/logos");
      setAllLogos(logos.data);
    }
    getLogos();
  }, []);

  const handleBack = () => {
    console.log("back");
  };

  const handleNext = async () => {};

  const renderLogos = () => {
    return allLogos.map((n) => {
      return (
        <div className="col" key={n.id}>
          <img
            className="logo"
            src={n.url}
            alt=""
            height={100}
            onClick={() => console.log(n.id)}
          />
        </div>
      );
    });
  };
  return (
    <div>
      <h1>LOGOS</h1>
      <div className="container">
        <div className="col">
          <button
            className="btn btn-outline-light mt-5"
            type="button"
            onClick={handleBack}
          >
            &lt;
          </button>
        </div>
        <div className="row">{renderLogos()}</div>
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
  );
};

export default Logos;

// useEffect(() => {
//   async function getLogos() {
//     const allLogos = await axios.get("/users/logos");
//     setLogos(allLogos);
//   }
//   getLogos();
//   console.log(logos);
// }, []);
