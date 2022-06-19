import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import "./login.css";
import { loginSuccess } from "./loginSlice";

const Login = (props) => {
  // const signedin = useSelector(selectSignedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    const user = {
      email: formValues.email,
      password: formValues.password,
    };

    fetch("/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
      })
      .then(() => {
        dispatch(loginSuccess());
        navigate("/");
      });
  };

  return (
    <div
      className="container-md d-flex justify-content-center align-items-center mt-5"
      style={{ height: "100vh" }}
    >
      <Form
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ handleSubmit }) => (
          <form className="card " onSubmit={handleSubmit}>
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
                <button className="btn btn-primary " type="submit">
                  Login
                </button>
              </div>
              <div>Forgot password</div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default Login;
