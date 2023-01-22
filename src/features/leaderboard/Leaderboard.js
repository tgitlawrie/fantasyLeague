import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "./leaderSlice";
import { Weekly } from "./weeklyboard";
import { Season } from "./seasonboard";

import "./leaderboard.css";

export const LeaderBoard = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.leaderboard.activeTab);

  console.log(currentTab);
  const renderTab = () => {
    switch (currentTab) {
      case "weekly":
        return <Weekly />;
      case "season":
        return <Season />;
      case "league":
        return "TODO";
      default:
        return "error";
    }
  };

  const handleChangeTab = (tab) => {
    dispatch(changeTab(tab));
  };

  return (
    <div className="container m-5 text-light leaderboard">
      <h3>Leaders</h3>
      <div className="card bg-transparent border-light">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("weekly")}
              className={`nav-link active ${
                currentTab === "weekly" ? "bg-transparent text-light" : ""
              }`}
            >
              Weekly
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("season")}
              className={`nav-link active ${
                currentTab === "season" ? "bg-transparent text-light" : ""
              }`}
            >
              Season
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("league")}
              className={`nav-link active ${
                currentTab === "league" ? "bg-transparent text-light" : ""
              }`}
            >
              League
            </button>
          </li>
        </ul>
        <div className="card-body">{renderTab()}</div>
      </div>
    </div>
  );
};
