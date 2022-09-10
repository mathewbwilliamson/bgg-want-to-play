const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

const getUserCondition = (userId) => {
  return {
    userId: {
      ComparisonOperator: "EQ",
      AttributeValueList: [userId],
    },
  };
};

const scanTable = async (tableName, userId) => {
  const params = {
    TableName: tableName,
    KeyConditions: getUserCondition(userId),
  };

  const scanResults = [];
  let items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return scanResults;
};

module.exports = { scanTable };
