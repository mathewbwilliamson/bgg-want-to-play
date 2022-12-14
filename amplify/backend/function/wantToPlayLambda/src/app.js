/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const {
  getPlayItemFromRequest,
  addCreateMetaData,
  addUpdateMetaData,
} = require("./models/wantToPlay.model");
const { getUserId, userIdErrorHandling } = require("./utilities/user.utils");
const {
  getSingleItemFromDb,
  getMultipleItemsFromDb,
  postItemToDb,
  deleteItemFromDb,
} = require("./repository/wantToPlay.repo");

AWS.config.update({ region: process.env.TABLE_REGION });

const sortKeyName = "bggId";
const hasSortKey = sortKeyName !== "";
const path = "/want-to-play";
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/********************************
 * HTTP Get method for list objects *
 ********************************/
app.get(path, async function (req, res) {
  try {
    const userId = getUserId(req);
    console.log("DEBUG userId", userId);

    userIdErrorHandling(userId);

    const items = await getMultipleItemsFromDb(userId);

    console.log("DEBUG items", items);

    return res.json(items);
  } catch (err) {
    console.log("Error happened, 500 sent", err);
    res.statusCode = 500;
    return res.json({ error: err, url: req.url, body: req.body });
  }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/
app.get(path + "/item" + sortKeyPath, async function (req, res) {
  try {
    const userId = getUserId(req);
    console.log("DEBUG userId", userId);

    userIdErrorHandling(userId);

    const bggId = req.params["bggId"];

    const item = await getSingleItemFromDb(userId, bggId);

    console.log("DEBUG item", item);

    return res.json(item);
  } catch (err) {
    console.log("Error happened, 500 sent", err);
    res.statusCode = 500;
    return res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP patch method for insert object *
 *************************************/
app.patch(path, async function (req, res) {
  try {
    const userId = getUserId(req);
    console.log("DEBUG userId", userId);

    userIdErrorHandling(userId);

    const itemChanges = getPlayItemFromRequest(req, userId);

    const bggId = itemChanges.bggId;

    const itemFromDb = await getSingleItemFromDb(userId, bggId);

    console.log("DEBUG itemFromDb", itemFromDb);

    if (!itemFromDb) {
      throw new Error("Item not found");
    }

    const updatedItem = addUpdateMetaData(
      { ...itemFromDb, ...itemChanges },
      userId
    );

    console.log("DEBUG updatedItem", updatedItem);

    await postItemToDb(updatedItem);

    const itemPosted = await getSingleItemFromDb(userId, bggId);

    console.log("DEBUG itemPosted", itemPosted);

    return res.json(itemPosted);
  } catch (err) {
    console.log("Error happened, 500 sent", err);
    res.statusCode = 500;
    return res.json({ error: err.message, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/
app.post(path, async function (req, res) {
  try {
    const userId = getUserId(req);
    console.log("DEBUG userId", userId);

    userIdErrorHandling(userId);

    const playItem = getPlayItemFromRequest(req, userId);

    const item = await getSingleItemFromDb(userId, playItem.bggId);

    const itemToSave = item
      ? addUpdateMetaData(playItem, userId)
      : addCreateMetaData(playItem, userId);

    await postItemToDb(itemToSave);

    const itemPosted = await getSingleItemFromDb(userId, playItem.bggId);

    console.log("DEBUG itemPosted", itemPosted);
    return res.json(itemPosted);
  } catch (err) {
    console.log("Error happened, 500 sent", err);
    res.statusCode = 500;
    return res.json({ error: err, url: req.url, body: req.body });
  }
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/
app.delete(path + "/item" + sortKeyPath, async function (req, res) {
  try {
    const userId = getUserId(req);
    console.log("DEBUG userId", userId);

    userIdErrorHandling(userId);

    const bggId = req.params["bggId"];

    if (!bggId) {
      throw new Error("bggId is required");
    }
    console.log("DEBUG bggId", bggId);
    await deleteItemFromDb(userId, bggId);

    return res.json(`Item with bggId ${bggId} deleted`);
  } catch (err) {
    console.log("Error happened, 500 sent", err);
    res.statusCode = 500;
    return res.json({ error: err, url: req.url, body: req.body });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
