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

module.exports = {
  searchBggBoardgame,
};
