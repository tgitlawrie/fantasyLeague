import React from "react";
import axios from "axios";

export const UserUpdate = () => {
  const handleWeeklyUpdate = async () => {
    try {
      const response = axios.post("/admin/user/weekly");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTotalUpdate = async () => {
    try {
      const response = axios.post("/admin/user/total");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sPanel m-2">
      <div className="card text-center">
        <div className="card-header">User scores</div>
        <div className="card-body">
          <h5 className="card-title">
            Update the User team scores in the users table
          </h5>
          <button className="btn btn-primary mt-3" onClick={handleWeeklyUpdate}>
            Update Weekly
          </button>
          <button className="btn btn-primary mt-3" onClick={handleTotalUpdate}>
            Update total
          </button>
        </div>
        <div className="card-footer text-muted">
          this will update the weekly scores and total scores
        </div>
      </div>
    </div>
  );
};
