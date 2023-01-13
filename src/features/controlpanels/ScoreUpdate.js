import React from "react";
import axios from "axios";

export const ScoreUpdate = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.get("admin/points/update");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sPanel">
      <div className="card text-center">
        <div className="card-header">Player scores</div>
        <div className="card-body">
          <h5 className="card-title">
            Update the player scores in the players table
          </h5>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Update
          </button>
        </div>
        <div className="card-footer text-muted">
          This will affect the weekly score at the chosen update time
        </div>
      </div>
    </div>
  );
};
