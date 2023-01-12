import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/navbar/Navbar";
import MyTeam from "./features/team/MyTeam";
import Signup from "./features/forms/Signup";
import Login from "./features/forms/Login";
import PlayerStats from "./features/playerstats/PlayerStats";
import Draft from "./features/team/Draft";
import axios from "axios";
import ControlPanel from "./features/controlpanels/controlpanel";

const App = () => {
  const dispatch = useDispatch();

  //makes a request to server when app loads to get the users state
  useEffect(() => {
    async function getState() {
      try {
        const response = await axios.get("/users/get-state");
        const state = await response.data;
        dispatch({ type: "RESTORE_STATE", payload: state });
      } catch (error) {
        console.error(error);
      }
    }

    getState();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MyTeam />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/playerstats" element={<PlayerStats />} />
        <Route exact path="/draft" element={<Draft />} />
        <Route exact path="/controlpanel" element={<ControlPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
