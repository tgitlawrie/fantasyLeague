import { React, useEffect, useState } from "react";
import axios from "axios";

export const Weekly = () => {
  const [top5, setTop5] = useState({});

  useEffect(() => {
    (async () => {
      await axios.get("/users/top/weekly").then((res) => {
        setTop5(res.data);
      });
    })();
  }, []);

  const renderTop5 = () => {
    return top5.map((user) => {
      return (
        <li
          key={user._id}
          className="list-group-item bg-transparent text-light"
        >
          <div className="row">
            <div className="col-6">{user.teamname}</div>
            <div className="col-6">{user.weeklyscore}</div>
          </div>
        </li>
      );
    });
  };

  return (
    <ul class="list-group list-group-flush">
      {top5.length > 0 ? renderTop5() : "...Loading"}
    </ul>
  );
};
