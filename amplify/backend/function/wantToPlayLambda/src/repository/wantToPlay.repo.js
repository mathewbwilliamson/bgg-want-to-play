const AWS = require("aws-sdk");

// AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

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

    const getItemParams = {
      TableName: tableName,
      Key: params,
    };
    console.log("DEBUG params, getItemParams", params, getItemParams);

    const data = await dynamodb.get(getItemParams).promise();

    console.log("DEBUG data", data);
    return data.Item;
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    throw new Error("Something wrong happened: ", err.message);
  }
};

const getMultipleItemsFromDb = async (userId) => {
  try {
    const params = {
      userId: String(userId),
    };

    const getItemParams = {
      TableName: tableName,
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames: {
        "#userId": "userId",
      },
      ExpressionAttributeValues: {
        ":userId": params.userId,
      },
    };
    console.log("DEBUG params, getItemParams", params, getItemParams);

    const data = await dynamodb.query(getItemParams).promise();

    console.log("DEBUG data", data);
    return data.Items;
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    throw new Error("Something wrong happened: ", err.message);
  }
};

const postItemToDb = async (item) => {
  try {
    const params = {
      TableName: tableName,
      Item: item,
    };
    console.log("DEBUG params", params);

    await dynamodb.put(params).promise();
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    throw new Error("Something wrong happened: ", err.message);
  }
};

const deleteItemFromDb = async (userId, bggId) => {
  try {
    const params = {
      userId: String(userId),
      bggId: String(bggId),
    };

    const deleteItemParams = {
      TableName: tableName,
      Key: params,
    };
    console.log("DEBUG params, deleteItemParams", params, deleteItemParams);

    await dynamodb.delete(deleteItemParams).promise();
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    throw new Error("Something wrong happened: ", err.message);
  }
};

module.exports = {
  getSingleItemFromDb,
  getMultipleItemsFromDb,
  postItemToDb,
  deleteItemFromDb,
};
