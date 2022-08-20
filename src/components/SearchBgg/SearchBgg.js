import React from "react";
import { searchBggApi } from "../../api/bggApi";

export const SearchBgg = () => {
  const [search, setSearch] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await searchBggApi(search);

    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] res", res);
  };

  return (
    <div>
      <label htmlFor="search">Search BGG</label>
      <input
        id="search"
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="submit" value="Search BGG" onClick={handleSubmit} />
    </div>
  );
};
