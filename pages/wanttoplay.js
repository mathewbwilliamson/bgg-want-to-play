import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import { FindBoardgameOnBgg } from "../src/components/FindBoardgameOnBgg/FindBoardgameOnBgg";
import { SearchBgg } from "../src/components/SearchBgg/SearchBgg";
import { TestWantToPlayApi } from "../src/components/TestWantToPlayApi/TestWantToPlayApi";

const WantToPlay = () => {
  return (
    <div>
      <h1>HELLO</h1>
      <SearchBgg />
      <FindBoardgameOnBgg />
      <TestWantToPlayApi />
    </div>
  );
};

export default withAuthenticator(WantToPlay);
