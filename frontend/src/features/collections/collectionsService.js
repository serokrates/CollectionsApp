import axios from "axios";
const API_URL = "/api/collection";

const deleteCollection = async (collectionID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      collectionID: collectionID,
    },
  };
  const response = await axios.delete(API_URL + "/me/" + collectionID, config);
  return response.data;
};

const getTopFiveCollections = async () => {
  console.log("getTopFiveCollections");
  const response = await axios.get(API_URL + "/main/topfive");

  return response.data;
};
const createCollection = async (d, token) => {
  const userID = d[0].userID;
  const collectionData = d[1].data;
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: collectionData.name,
      description: collectionData.description,
      topic: collectionData.topic,
    },
  };
  console.log(config, userID);
  const response = await axios.post(API_URL + "/me/" + userID, d, config);
  return response.data;
};

const getCollections = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getUserCollections = async (userID) => {
  const response = await axios.get(API_URL + "/" + userID, {
    params: {
      userID: userID,
    },
  });
  return response.data;
};
const editCollection = async (d, token) => {
  const userID = d[0].userID;
  const collectionData = d[1].data;
  const collectionID = d[2].collectionID;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      collectionID: collectionID,
    },
  };
  const data = {
    name: collectionData.name,
    description: collectionData.description,
    topic: collectionData.topic,
  };
  const response = await axios.put(API_URL + "/me/" + userID, data, config);
  return response.data;
};
const collectionsService = {
  getCollections,
  getUserCollections,
  createCollection,
  deleteCollection,
  editCollection,
  getTopFiveCollections,
};

export default collectionsService;
