import React from "react";
import { connect } from "react-redux";

const PlayerStats = (players) => {
  return <div style={{ marginTop: "60px" }}>Player Stats Table</div>;
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

export default connect(mapStateToProps)(PlayerStats);
