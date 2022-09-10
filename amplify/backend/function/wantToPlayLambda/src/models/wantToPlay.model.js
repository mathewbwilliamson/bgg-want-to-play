const getPlayItemFromRequest = (req, userId) => {
  return {
    bggId: req.body.bggId,
    notes: req.body?.notes,
    isPlayed: req.body?.isPlayed,
    playDate: req.body?.playDate,
    userId: userId,
  };
};

module.exports = { getPlayItemFromRequest };
