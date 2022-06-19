import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//TODO
// refactor post requests with axios https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

const Signup = () => {
  const navigate = useNavigate();

  async function handleRegister(e) {
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
    <div style={{ marginTop: "60px" }}>
      <form onSubmit={(e) => handleRegister(e)}>
        <label>Email: </label>
        <input required type="email" />
        <label>Password: </label>
        <input required type="password" />
        <label>Team Name: </label>
        <input required type="teamname" />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Signup;
