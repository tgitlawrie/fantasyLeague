import React, { useEffect, useState } from "react";
import axios from "axios";

export const ScorePanel = () => {
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setID] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/admin/points");
        const data = response.data.value;
        setSettings(data);
        setID(response.data._id);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const payload = { id, settings: { ...settings } };
    try {
      const response = await axios.post("/admin/points", payload);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncrement = (key) => {
    setSettings({ ...settings, [key]: settings[key] + 1 });
    console.log(settings);
    console.log(id);
  };

  const handleDecrement = (key) => {
    setSettings({ ...settings, [key]: settings[key] - 1 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="sPanel">
      <div className="card text-center">
        <div className="card-header">Score Settings</div>
        <div className="card-body">
          <h5 className="card-title">
            Changes the points the values of each player stat
          </h5>
          <ul className="list-group">
            {Object.entries(settings).map(([key, value]) => (
              // maps the objects keys and values to key and value
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={key}
              >
                {key}: {value}{" "}
                <button onClick={() => handleIncrement(key)}>+</button>{" "}
                <button onClick={() => handleDecrement(key)}>-</button>
              </li>
            ))}
          </ul>
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
