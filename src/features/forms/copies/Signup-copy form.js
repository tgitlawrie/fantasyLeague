import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";

//TODO
// refactor post requests with axios https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

const Signup = () => {
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      email: form[0].value,
      password: form[1].value,
      teamname: form[2].value,
    };

    fetch("/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(navigate("/login"));
  }

  useEffect(() => {
    fetch("/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
  }, []);

  //TODO
  // confirm password

  return (
    <div
      className="container-md d-flex justify-content-center align-items-center mt-5"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit} className="card">
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
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <Field
                  className="form-control"
                  name="passwordconfirm"
                  component="input"
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
