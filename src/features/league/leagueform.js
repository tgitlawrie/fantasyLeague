import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const onSubmit = (formValues, user) => {
  const userId = { userId: user };
  const data = Object.assign(formValues, userId);
  axios.post("/league/create", data);
};

const LeagueForm = () => {
  const [hasSizeLimit, setHasSizeLimit] = useState(false);
  const user = useSelector((state) => state.login.user);

  const handleLimitChange = () => {
    setHasSizeLimit(!hasSizeLimit);
  };

  return (
    <div className="container text-light">
      <div className="row" id="">
        <Form
          onSubmit={(values) => {
            if (hasSizeLimit) {
              values.leagueSizeLimit =
                document.getElementById("leagueSizeLimit").value;
            }
            onSubmit(values, user);
          }}
        >
          {({ handleSubmit }) => (
            <form className="card" id="form-card" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="mb-3">
                  <h3>Create League</h3>
                  <Field
                    className="form-control"
                    name="leagueName"
                    component="input"
                    placeholder="League Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>League Mode: </label>{" "}
                  <Field name="leagueMode" component="select">
                    <option value="h2h">Head 2 Head</option>
                    <option value="redraft">Redraft</option>
                    <option value="rotisserie">Rotisserie</option>
                    <option value="points">Points based</option>
                  </Field>
                </div>
                <div className="mb-3">
                  <label>
                    <Field name="canInvite" component="input" type="checkbox" />{" "}
                    Allow anyone to invite
                  </label>
                </div>
                <div className="mb-3">
                  <label>
                    <input
                      id="maxSize"
                      name="maxSize"
                      type="checkbox"
                      value={hasSizeLimit}
                      onChange={handleLimitChange}
                    />{" "}
                    limit league size
                  </label>
                  {hasSizeLimit && (
                    <input
                      type="number"
                      id="leagueSizeLimit"
                      min="0"
                      required
                    />
                  )}
                </div>

                <div className="mb-3">
                  <button className="btn btn-outline-light " type="submit">
                    Create League
                  </button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default LeagueForm;
