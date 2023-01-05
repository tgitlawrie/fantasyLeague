import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import axios from "axios";

import { PlayerCard } from "../playerCard/PlayerCard";
import { advanceDraft, isDraftComplete, setNewTeam } from "../team/draftSlice";
import { expandOn, lockExpand } from "../playerCard/playerCardSlice";
import AssignTeam from "./AssignTeam";
import Logos from "../logoPicker/LogoPicker";
import { GoalieCard } from "../playerCard/GoalieCard";

const Draft = () => {
  const dispatch = useDispatch();

  const draftStage = useSelector((state) => state.draft.draftStage);
  const name = useSelector((state) => state.draft.newTeam.name);

  const [C, setC] = useState({});
  const [LW, setLW] = useState({});
  const [RW, setRW] = useState({});
  const [LD, setLD] = useState({});
  const [RD, setRD] = useState({});
  const [G, setG] = useState({});

  const onSelect = (action) => {
    if (action.position === "G") {
      dispatch(isDraftComplete(true));
    }
    dispatch(setNewTeam(action));
    dispatch(advanceDraft());
  };

  useEffect(() => {
    async function getOptions() {
      // gets the 3 options from server.
      const options = await axios.get("/players/team/draft");
      console.log(options.data);
      setC(options.data.C);
      setLW(options.data.LW);
      setLD(options.data.LD);
      setRW(options.data.RW);
      setRD(options.data.RD);
      setG(options.data.G);
    }
    getOptions();
    dispatch(expandOn());
    dispatch(lockExpand(true));
  }, []);

  const onSubmit = (formValues) => {
    // dispatch to the draft team slice
    dispatch(setNewTeam(formValues.teamname));
    dispatch(advanceDraft());
  };

  const renderedOptions = () => {
    switch (draftStage) {
      case 1:
        //explain the draft
        return (
          <>
            <h2>step1. Choose a Team Name</h2>
            <h2>Step2. Choose a Center</h2>
            <h2>Step3. Choose a Left Wing</h2>
            <h2>Step5. Choose a Right Wing</h2>
            <h2>Step5. Choose a Left Defender</h2>
            <h2>Step6. Choose a Right Defender</h2>
            <h2>Step7. Choose a Goalie</h2>
            <button
              className="btn btn-outline-light "
              onClick={() => dispatch(advanceDraft())}
            >
              Begin Draft
            </button>
          </>
        );
      case 2:
        //get team name
        return (
          <>
            {/* TODO profanity filter */}
            <h2>Name your Team</h2>
            <Form
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    className="form-control mt-3"
                    name="teamname"
                    component="input"
                  />
                  <Logos />
                  <button className="btn btn-outline-light mt-5" type="submit">
                    Continue
                  </button>
                </form>
              )}
            </Form>
          </>
        );
      case 3:
        //choose Center

        return (
          <>
            <h2>Choose Center</h2>
            <div className="col" onClick={() => onSelect(C[0])}>
              {<PlayerCard player={C[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(C[1])}>
              {<PlayerCard player={C[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(C[2])}>
              {<PlayerCard player={C[2]} />}
            </div>
          </>
        );
      case 4:
        //Choose LW
        return (
          <>
            <h2>Choose Left Wing</h2>
            <div className="col" onClick={() => onSelect(LW[0])}>
              {<PlayerCard player={LW[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(LW[1])}>
              {<PlayerCard player={LW[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(LW[2])}>
              {<PlayerCard player={LW[2]} />}
            </div>
          </>
        );
      case 5:
        //Choose RW
        return (
          <>
            <h2>Choose Right Wing</h2>
            <div className="col" onClick={() => onSelect(RW[0])}>
              {<PlayerCard player={RW[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(RW[1])}>
              {<PlayerCard player={RW[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(RW[2])}>
              {<PlayerCard player={RW[2]} />}
            </div>
          </>
        );
      case 6:
        //choose LD
        return (
          <>
            <h2>Choose Left Defender</h2>
            <div className="col" onClick={() => onSelect(LD[0])}>
              {<PlayerCard player={LD[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(LD[1])}>
              {<PlayerCard player={LD[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(LD[2])}>
              {<PlayerCard player={LD[2]} />}
            </div>
          </>
        );
      case 7:
        //Choose RD
        return (
          <>
            <h2>Choose Right Defender</h2>
            <div className="col" onClick={() => onSelect(RD[0])}>
              {<PlayerCard player={RD[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(RD[1])}>
              {<PlayerCard player={RD[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(RD[2])}>
              {<PlayerCard player={RD[2]} />}
            </div>
          </>
        );
      case 8:
        //Choose Goalie
        return (
          <>
            <h2>Choose Goalie</h2>
            <div className="col" onClick={() => onSelect(G[0])}>
              {<GoalieCard player={G[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(G[1])}>
              {<GoalieCard player={G[1]} />}
            </div>
            <div className="col" onClick={() => onSelect(G[2])}>
              {<GoalieCard player={G[2]} />}
            </div>
          </>
        );
      // check team and submit
      default:
        console.log("outside of draft switch");
        console.log(draftStage);
      //ERROR OH DANG
    }
  };

  return (
    <div
      className="container-md text-center text-light"
      style={{ height: "100vh" }}
    >
      <div className="col-md-8 mt-5 offset-md-2">
        <div className="row">
          <h1>Draft Mode</h1>
        </div>
        <div className="container mt-5">
          <div className="row">{renderedOptions()}</div>
        </div>
      </div>
      <div>
        <AssignTeam name={name} />
      </div>
    </div>
  );
};

export default Draft;
