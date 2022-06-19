import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Field, reduxForm } from "redux-form";
import { Field, Form } from "react-final-form";
import { values } from "redux-form";

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
                <button className="btn btn-primary " type="submit">
                  Submit
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

export default Signup;
