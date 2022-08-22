import React from "react";
import { getBoardgameBggApi } from "../../api/bggApi";
import { getAllBoardgamesFromDb } from "../../api/wantToPlayApi";

export const FindBoardgameOnBgg = () => {
  const [bggId, setBggId] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await getBoardgameBggApi(bggId);

    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] res", res);
  };

  return (
    <div>
      <label htmlFor="search">Get Game from BGG</label>
      <input
        id="search"
        name="search"
        type="text"
        value={bggId}
        onChange={(e) => setBggId(e.target.value)}
      />
      <input type="submit" value="Get Game" onClick={handleSubmit} />
      <button
        onClick={async () => {
          const thing = await getAllBoardgamesFromDb();
          console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] thing", thing);
        }}
      >
        Get All from DB
      </button>
    </div>
  );
};
