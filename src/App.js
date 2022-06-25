import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/navbar/Navbar";
import MyTeam from "./features/showTeam/MyTeam";
import Signup from "./features/forms/Signup";
import Login from "./features/forms/Login";
import PlayerStats from "./features/playerstats/PlayerStats";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MyTeam />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/playerstats" element={<PlayerStats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
