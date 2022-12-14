import { API } from "aws-amplify";

const wantToPlayApi = "wantToPlayApi";

export const getAllBoardgamesFromDb = async () => {
  return await API.get(wantToPlayApi, "/want-to-play");
};

export const getSingleBoardgameFromDb = async (bggId) => {
  return await API.get(wantToPlayApi, `/want-to-play/item/${bggId}`);
};

export const postNewWantToPlayEntry = async (body) => {
  const payload = {
    body,
  };
  return await API.post(wantToPlayApi, "/want-to-play", payload);
};

export const updateWantToPlayEntry = async (body) => {
  if (!body.bggId) {
    throw new Error("bggId is required");
  }

  const payload = {
    body,
  };
  return await API.patch(wantToPlayApi, "/want-to-play", payload);
};

export const deleteSingleBoardgameFromDb = async (bggId) => {
  if (!bggId) {
    throw new Error("bggId is required");
  }
  return await API.del(wantToPlayApi, `/want-to-play/item/${bggId}`);
};
