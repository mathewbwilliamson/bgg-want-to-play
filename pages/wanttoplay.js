import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import { API } from "aws-amplify";

const bggApi = "bggApi";

const WantToPlay = () => {
  const [search, setSearch] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      body: {
        searchTerm: search,
      },
    };

    const res = await API.post(bggApi, "/bgg-api/search", payload);

    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] res", res);
  };

  return (
    <div>
      <h1>HELLO</h1>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="submit" value="do-search" onClick={handleSubmit} />
    </div>
  );
};

export default withAuthenticator(WantToPlay);
