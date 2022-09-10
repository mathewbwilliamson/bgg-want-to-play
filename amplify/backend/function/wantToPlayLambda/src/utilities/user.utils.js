const getUserId = (req) => {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  return userId;
};

module.exports = { getUserId };
