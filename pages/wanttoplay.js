import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import { FindBoardgameOnBgg } from "../src/components/FindBoardgameOnBgg/FindBoardgameOnBgg";
import { SearchBgg } from "../src/components/SearchBgg/SearchBgg";

const WantToPlay = () => {
  return (
    <div>
      <h1>HELLO</h1>
      <SearchBgg />
      <FindBoardgameOnBgg />
    </div>
  );
};

export default withAuthenticator(WantToPlay);
