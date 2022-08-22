import React from "react";
import { searchBggApi } from "../../api/bggApi";
import { postNewWantToPlayEntry } from "../../api/wantToPlayApi";

export const TestWantToPlayApi = () => {
  const [bggId, setBggId] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bggId,
      notes,
    };

    const res = await postNewWantToPlayEntry(payload);

    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] res", res);
  };

  return (
    <div>
      <h1>Create a WantToPlayEntry</h1>
      <label htmlFor="bggId">Search BGG</label>
      <input
        id="bggId"
        name="bggId"
        type="text"
        value={bggId}
        onChange={(e) => setBggId(e.target.value)}
      />
      <input type="submit" value="Submit WantToPlay" onClick={handleSubmit} />
    </div>
  );
};
