const AWS = require("aws-sdk");
const { getUserCondition } = require("../utilities/db.utils");

// AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const partitionKeyName = "userId";
const partitionKeyType = "S";
const sortKeyName = "bggId";
const sortKeyType = "S";

let tableName = "wantToPlayTbl";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const getSingleItemFromDb = async (userId, bggId) => {
  try {
    const params = {
      userId: String(userId),
      bggId: String(bggId),
    };
    console.log("params", params, bggId);

    const getItemParams = {
      TableName: tableName,
      Key: params,
    };
    console.log("DEBUG params, getItemParams", params, getItemParams);

    const thing = await dynamodb.get(getItemParams).promise();
    console.log("THING", thing);

    return thing;
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    throw new Error("Something wrong happened: ", err.message);
  }
};

module.exports = {
  getSingleItemFromDb,
};
