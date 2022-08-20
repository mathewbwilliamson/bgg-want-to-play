const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { searchBggBoardgame } = require("./bggService");

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

/**********************
 * Example get method *
 **********************/

app.get("/bgg-api", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/bgg-api/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/bgg-api/search", async function (req, res) {
  const { searchTerm } = req.body;
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] req.body", req.body);

  if (!searchTerm) {
    throw new Error("Search Term is empty");
  }

  console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] searchTerm", searchTerm);

  const searchResults = await searchBggBoardgame(searchTerm);

  // Add your code here
  res.json({ success: "Search Successful", searchResults });
});

app.post("/bgg-api/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/bgg-api", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/bgg-api/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/bgg-api", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/bgg-api/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
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
