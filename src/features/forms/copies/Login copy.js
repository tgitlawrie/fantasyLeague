import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  signIn,
  signOut,
} from "../features/navbar/navbarSlice";

// import background from "../assets/mark-landman-o0zXUnmxsA0-unsplash.jpg";

const Login = () => {
  // const signedin = useSelector(selectSignedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      email: form[0].value,
      password: form[1].value,
    };

    fetch("/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(signIn());
      });
  }

  // this just prevents manual navigation to log in, may not need this.
  useEffect(() => {
    fetch("/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
  }, [navigate]);

  return (
    <div
      style={{
        marginTop: "60px",
        // backgroundImage: `url(${background})`,
        height: "100vh",
      }}
    >
      <form onSubmit={(e) => handleLogin(e)}>
        <label>Email: </label>
        <input required type="email" />
        <label>Password:</label>
        <input required type="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
