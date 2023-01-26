import React from "react";

import LeagueForm from "./leagueform";

/*TODO
change this to detect if user has leagues, if not display create league, otherwise display league information
*/
const CreateLeague = () => {
  return (
    <div className="container text-light">
      <h1>Create League</h1>
      <div className="row">
        <div className="col col-md-6">
          <LeagueForm />
        </div>
        <div className="col col-md-6">
          <div className="card" id="form-card">
            <div className="card-body">
              <h5 className="card-title">Info</h5>
              <div className="card-text">
                <ul className="list-group">
                  <li className="list-group-item bg-transparent text-light">
                    {/* TODO extract these descriptions out and display them
                    conditionally */}
                    <h3>Head 2 Head</h3>
                    <p>
                      In a head to head league each player will be matched
                      against another player each week. when the weeks points
                      are calculated the team with more points than their
                      opponent will receive a win. At the end of the season the
                      team with the most wins is the champion
                    </p>
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <h3>Redraft</h3>
                    <p>
                      In a Redraft league at the end of each week after points
                      are awarded each player will given the chance to redraft
                      their team. at the end of the season the team with the
                      most points is the champion
                    </p>
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <h3>Rotisserie</h3>
                    <p>
                      In a Rotisserie league each team is ranked based on an
                      average performance rather than individual player points.
                      at the end of the season the team with the highest ranking
                      is the champion
                    </p>
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <h3>Points</h3>
                    <p>
                      In a points based league each player is given a score
                      based on ingame performance, each team will be awarded the
                      total points earned by all its players. at the end of the
                      season the team with the most points is the champion
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLeague;
