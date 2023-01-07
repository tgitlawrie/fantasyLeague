import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import "./login.css";
import { loginSuccess } from "./loginSlice";
import { signIn } from "../navbar/navbarSlice";
import { setTeam } from "../team/teamSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    const user = {
      email: formValues.email,
      password: formValues.password,
    };
    //TODO fix login condition if failed
    fetch("/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(signIn(data.payload));
        dispatch(loginSuccess(data.payload.id));

        // if team length is less than 6 go to draft mode
        if (data.payload.team.length === 6) {
          dispatch(setTeam(data.payload));
          navigate("/");
        } else {
          navigate("/draft");
        }
      });
  };

  return (
    <div className="login" id="main-body">
      <div
        className="container-md d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Form
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ handleSubmit }) => (
            <form className="card" id="form-card" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="mb-3">
                  <h3>Login</h3>
                  <Field
                    className="form-control"
                    name="email"
                    component="input"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-outline-light " type="submit">
                    Login
                  </button>
                </div>
                {/* TODO implement forgot password */}
                <div>Forgot password</div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
