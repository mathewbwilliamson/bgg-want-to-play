const getUserId = (req) => {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  return userId;
};

const userIdErrorHandling = (userId) => {
  if (!userId) {
    throw new Error("User not found!");
  }
};

module.exports = {
  getUserId,
  userIdErrorHandling,
};
