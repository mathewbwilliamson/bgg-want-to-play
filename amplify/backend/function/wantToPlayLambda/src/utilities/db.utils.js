const getUserCondition = (userId) => {
  return {
    userId: {
      ComparisonOperator: "EQ",
      AttributeValueList: [userId],
    },
  };
};

module.exports = { getUserCondition };
