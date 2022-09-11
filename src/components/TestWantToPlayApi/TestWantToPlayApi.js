import React from "react";
import { searchBggApi } from "../../api/bggApi";
import {
  getAllBoardgamesFromDb,
  getSingleBoardgameFromDb,
  postNewWantToPlayEntry,
} from "../../api/wantToPlayApi";

export const TestWantToPlayApi = () => {
  // FIXME: [matt] Add in React-Hook-Form!
  const [bggId, setBggId] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [singleGetId, setSingleGetId] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bggId,
      notes,
      isPlayed: true,
      playDate: new Date(),
    };

    const res = await postNewWantToPlayEntry(payload);

    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] res", res);
  };

  return (
    <div>
      <h1>Create a WantToPlayEntry</h1>
      <label htmlFor="bggId">BGG ID</label>
      <input
        id="bggId"
        name="bggId"
        type="text"
        value={bggId}
        onChange={(e) => setBggId(e.target.value)}
      />
      <label htmlFor="notes">Notes</label>
      <input
        id="notes"
        name="notes"
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input type="submit" value="Submit WantToPlay" onClick={handleSubmit} />
      <button onClick={() => getAllBoardgamesFromDb()}>
        FETCH ALL USER GAMES
      </button>
      <input
        id="singleGetId"
        name="singleGetId"
        type="text"
        value={singleGetId}
        onChange={(e) => setSingleGetId(e.target.value)}
      />
      <button onClick={() => getSingleBoardgameFromDb(singleGetId)}>
        FETCH SINGLE GAME
      </button>
    </div>
  );
};
