import { API } from "aws-amplify";

const bggApi = "bggApi";

export const getBoardgameBggApi = async (bggId) => {
  const payload = {
    body: {
      bggId,
    },
  };

  return await API.post(bggApi, "/bgg-api/boardgame", payload);
};

export const searchBggApi = async (searchTerm) => {
  const payload = {
    body: {
      searchTerm,
    },
  };

  return await API.post(bggApi, "/bgg-api/search", payload);
};
