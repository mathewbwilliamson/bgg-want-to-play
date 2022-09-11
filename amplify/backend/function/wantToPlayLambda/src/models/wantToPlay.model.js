const getPlayItemFromRequest = (req, userId) => {
  return {
    bggId: req.body.bggId,
    notes: req.body?.notes,
    isPlayed: req.body?.isPlayed,
    playDate: req.body?.playDate,
    userId: userId,
  };
};

const addCreateMetaData = (item, userId) => {
  return {
    ...item,
    createdAt: new Date().toString(),
    createdBy: userId,
    updatedAt: new Date().toString(),
    updatedBy: userId,
  };
};

const addUpdateMetaData = (item, userId) => {
  return {
    ...item,
    updatedAt: new Date().toString(),
    updatedBy: userId,
  };
};

module.exports = {
  getPlayItemFromRequest,
  addCreateMetaData,
  addUpdateMetaData,
};
