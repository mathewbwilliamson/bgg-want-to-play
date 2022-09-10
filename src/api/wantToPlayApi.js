import { API } from "aws-amplify";

const wantToPlayApi = "wantToPlayApi";

export const getAllBoardgamesFromDb = async () => {
  return await API.get(wantToPlayApi, "/want-to-play");
};

export const postNewWantToPlayEntry = async (body) => {
  const payload = {
    body,
  };
  return await API.post(wantToPlayApi, "/want-to-play", payload);
};