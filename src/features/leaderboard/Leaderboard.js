import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "./leaderSlice";
import { Weekly } from "./weeklyboard";

export const LeaderBoard = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.leaderboard.activeTab);

  console.log(currentTab);
  const renderTab = () => {
    return currentTab === "weekly" ? (
      <Weekly />
    ) : currentTab === "season" ? (
      "Seaon Tab"
    ) : currentTab === "league" ? (
      "league Tab"
    ) : (
      "weeklyTab"
    );
  };

  const handleChangeTab = (tab) => {
    dispatch(changeTab(tab));
  };

  return (
    <div className="container m-5 text-light">
      <h3>Leaders</h3>
      <div className="card bg-transparent border-light w-">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("weekly")}
              className="nav-link active"
            >
              Weekly
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("season")}
              className="nav-link active"
            >
              Season
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => handleChangeTab("league")}
              className="nav-link active"
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
