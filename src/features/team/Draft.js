import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlayerCard } from "../playerCard/PlayerCard";
import { addPlayer, advanceDraft, retreatDraft } from "../team/draftSlice";
import axios from "axios";
import { expandOn, lockExpand } from "../playerCard/playerCardSlice";

const Draft = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.login.user);

  const [C, setC] = useState({});
  const [LW, setLW] = useState({});
  const [RW, setRW] = useState({});
  const [LD, setLD] = useState({});
  const [RD, setRD] = useState({});
  const [G, setG] = useState({});
  const draftStage = useSelector((state) => state.draft.draftStage);

  const onSelect = (action) => {
    const payload = Object.assign(action, { user: userID });
    console.log(payload);
    dispatch(addPlayer(payload));
    dispatch(advanceDraft());
  };

  useEffect(() => {
    async function getOptions() {
      const options = await axios.get("/players/team/draft");
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
          </>
        );
      case 2:
        //get team name
        return (
          <>
            <h2>Choose Team</h2>
          </>
        );
      case 3:
        //choose Center

        return (
          <div className="row">
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
          </div>
        );
      case 4:
        //Choose LW
        return (
          <div className="row">
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
          </div>
        );
      case 5:
        //Choose RW
        return (
          <div className="row">
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
          </div>
        );
      case 6:
        //choose LD
        return (
          <div className="row">
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
          </div>
        );
      case 7:
        //Choose RD
        return (
          <div className="row">
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
          </div>
        );
      case 8:
        //Choose Goalie
        return (
          <div className="row">
            <h2>Choose Goalie</h2>
            <div className="col" onClick={() => onSelect(G[0])}>
              {<PlayerCard player={G[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(G[0])}>
              {<PlayerCard player={G[0]} />}
            </div>
            <div className="col" onClick={() => onSelect(G[0])}>
              {<PlayerCard player={G[0]} />}
            </div>
          </div>
        );
      default:
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
        <div className="container">{renderedOptions()}</div>
      </div>
      <button
        className="btn btn-outline-light "
        type="button"
        onClick={() => dispatch(advanceDraft())}
      >
        Next
      </button>
      <button
        className="btn btn-outline-light "
        type="button"
        onClick={() => dispatch(retreatDraft())}
      >
        Back
      </button>
    </div>
  );
};

export default Draft;
