import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/navbar/Navbar";
import MyTeam from "./components/MyTeam";
import Signup from "./features/forms/Signup";
import Login from "./features/forms/Login";
import PlayerStats from "./components/PlayerStats.js";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MyTeam />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/playerstats" element={<PlayerStats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
