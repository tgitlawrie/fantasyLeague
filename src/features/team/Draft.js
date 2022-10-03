import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Draft = () => {
  return (
    <div className="container text-center text-light">
      <div className="row">
        <h1>Draft Mode</h1>
      </div>
      <div className="row">
        <h2>content here</h2>
      </div>
    </div>
  );
};

export default Draft;
