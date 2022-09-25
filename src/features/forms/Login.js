import React from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import "./login.css";
import { loginSuccess } from "./loginSlice";
import { signIn } from "../navbar/navbarSlice";
import { setTeam, hasTeam } from "../team/teamSlice";

const Login = () => {
  // const signedin = useSelector(selectSignedIn);
  // const team = useSelector((state) => state.team);
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
        dispatch(setTeam(data.payload.team));
        dispatch(hasTeam());
        console.log(`login:` + data.payload.team);
        localStorage.setItem("token", data.token);
      })
      .then(() => {
        dispatch(loginSuccess());
        navigate("/");
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
