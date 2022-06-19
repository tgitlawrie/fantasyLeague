import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import "./login.css";

function onSubmit(e) {
  e.preventDefault();

  const form = e.target;
  console.log(form);
}

const Login = () => (
  <div
    className="container-md d-flex justify-content-center align-items-center mt-5"
    style={{ height: "100vh" }}
  >
    <Form onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.onSubmit} className="card">
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
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
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

export default Login;
