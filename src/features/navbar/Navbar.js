import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function renderAuth() {
    if (localStorage.token) {
      return (
        <ul className="navbar-nav ">
          <li className="nav-item">
            <div className="nav-link" onClick={logout}>
              Logout
            </div>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ">
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

  useEffect(() => {}, []);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
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
