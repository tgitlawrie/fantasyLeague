import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  //TODO Paginate this and style better

  const renderedPlayers = () => {
    if (!loading && players.length > 0) {
      return players.map((player) => {
        return (
          <tr key={player._id}>
            <td>{player.number}</td>
            <td>{`${player.firstName} ${player.lastName}`}</td>
            <td>{player.team}</td>
            <td>{player.gamesPlayed}</td>
            <td>{player.goals}</td>
            <td>{player.assists}</td>
            <td>{player.points}</td>
            <td>{player.ppGoals}</td>
            <td>{player.ppAssists}</td>
            <td>{player.shGoals}</td>
            <td>{player.shAssists}</td>
            <td>{player.penaltyMins}</td>
            <td>{player.avgPoints}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    }
  };

  const getPlayers = async () => {
    const allPlayers = await axios.post("/players/all");
    setPlayers(allPlayers.data.players);
  };

  useEffect(() => {
    if (loading) {
      getPlayers();
      setLoading(false);
    }
  }, [players, loading]);

  return (
    <div className="col-md-8 mt-5 offset-md-2">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">GP</th>
            <th scope="col">G</th>
            <th scope="col">A</th>
            <th scope="col">PTS</th>
            <th scope="col">PPG</th>
            <th scope="col">PPA</th>
            <th scope="col">SH</th>
            <th scope="col">SHA</th>
            <th scope="col">PIM</th>
            <th scope="col">AVG PTS</th>
          </tr>
        </thead>
        <tbody>{renderedPlayers()}</tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
