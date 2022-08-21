const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { searchBggBoardgame, getBggBoardgameById } = require("./bggService");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] req", req);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/bgg-api/search", async function (req, res) {
  console.log("LOG: req.body", req.body);

  const { searchTerm } = req.body;

  if (!searchTerm) {
    throw new Error("Search Term is empty");
  }

  try {
    const searchResults = await searchBggBoardgame(searchTerm);
    console.log("LOG: searchResults", searchResults);

    res.json({ success: "Search Successful", searchResults });
  } catch (e) {
    console.error(
      "ERROR! There was a problem with searching via searchTerm: ",
      searchTerm
    );
    console.error(e);
  }
});

app.post("/bgg-api/boardgame", async function (req, res) {
  console.log("LOG: req.body", req.body);

  const { bggId } = req.body;

  if (!bggId) {
    throw new Error("BGG Id is empty");
  }

  try {
    const boardgameResult = await getBggBoardgameById(bggId);
    console.log("LOG: boardgameResult", boardgameResult);

    res.json({ success: "Boardgame Find Successful", boardgameResult });
  } catch (e) {
    console.error(
      "ERROR! There was a problem with getting the boardgame via bggId",
      bggId
    );
    console.error(e);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("err", err);
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
