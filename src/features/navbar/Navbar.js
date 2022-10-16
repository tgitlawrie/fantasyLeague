import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "./navbarSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teamname = useSelector((state) => state.team.team.name);
  const score = useSelector((state) => state.navbar.score);
  const isSignedIn = useSelector((state) => state.navbar.isSignedIn);

  async function logout() {
    dispatch(signOut());
    navigate("/login");
  }

  function renderAuth() {
    if (localStorage.token && isSignedIn) {
      return (
        <React.Fragment>
          <div className="navbar-brand col-sm-3">{teamname}</div>
          <div className="navbar-brand col-sm-4">{score}</div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link" onClick={logout}>
                Logout
              </div>
            </li>
          </ul>
        </React.Fragment>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              Signup
            </Link>
          </li>
        </ul>
      );
    }
  }

  useEffect(() => {}, [teamname, score, isSignedIn]);

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/playerstats"} className="nav-link">
                Player Stats
              </Link>
            </li>
          </ul>
          {renderAuth()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
