const bggXmlApiClient = require("bgg-xml-api-client");

const convertBggSearchToJSON = (bggSearchList) => {
  return bggSearchList.map((item) => {
    return {
      id: item.id,
      name: item.name.value,
      yearPublished: item.yearpublished.value,
    };
  });
};

async function searchBggBoardgame(searchTerm) {
  const { data } = await bggXmlApiClient.getBggSearch({
    query: searchTerm,
    type: "boardgame",
  });

  return convertBggSearchToJSON(data.item);
}

const getBggBoardgameById = async (bggId) => {
  const { data } = await bggXmlApiClient.getBggThing({
    type: "boardgame",
    id: bggId,
  });

  return convertBggBoardGameToJSON(data);
};

const convertBggBoardGameToJSON = (bgg) => {
  const game = {
    id: bgg.item.id,
    thumbnail: bgg.item.thumbnail,
    name: bgg.item.name.find((item) => item.type === "primary").value,
    yearPublished: bgg.item.yearpublished.value,
    minPlayTime: bgg.item.minplaytime.value,
    maxPlayTime: bgg.item.maxplaytime.value,
    minPlayers: bgg.item.minplayers.value,
    maxPlayers: bgg.item.maxplayers.value,
  };

  return game;
};

module.exports = {
  searchBggBoardgame,
  getBggBoardgameById,
};
