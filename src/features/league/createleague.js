import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ShowLeagues from "./showleagues";

const onSubmit = (formValues, user) => {
  const userId = { userId: user };
  const data = Object.assign(formValues, userId);
  axios.post("/league/create", data);
};

const CreateLeague = ({ onCloseModal }) => {
  const [hasSizeLimit, setHasSizeLimit] = useState(false);
  const user = useSelector((state) => state.login.user);

  const handleLimitChange = () => {
    setHasSizeLimit(!hasSizeLimit);
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
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
        <form
          className="card league-card h-100 w-100"
          id="form-card"
          onSubmit={handleSubmit}
        >
          <div className="card-body text-center">
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
                <input type="number" id="leagueSizeLimit" min="0" required />
              )}
            </div>
          </div>
          <div className="mb-3 container">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <button className="btn btn-outline-light" type="submit">
                  Create League
                </button>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleCloseModal}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default CreateLeague;
