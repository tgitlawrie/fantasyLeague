import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import "./login.css";

//TODO
// refactor post requests with axios https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

const Signup = (props) => {
  const navigate = useNavigate();

  const onSubmit = (formValues) => {
    const user = {
      email: formValues.email,
      password: formValues.password,
    };

    fetch("/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="signup" id="main-body">
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
                  <h3>Sign Up</h3>
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
                  <Field
                    className="form-control"
                    name="passwordconfirm"
                    component="input"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-outline-light" type="submit">
                    Sign Up
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

export default Signup;
