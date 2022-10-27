import axios from "axios";
import authService from "../auth/authService";
const API_URL = "/api/item";

const getItems = async (collectionID) => {
  const response = await axios.get(API_URL + "/" + collectionID, {
    params: {
      collectionID: collectionID,
    },
  });
  return response.data;
};
const deleteItem = async (token, d) => {
  const actionToDo = d[1].actionToDo;
  const itemID = d[0].itemID;
  const collectionID = d[2].collectionID;
  const userID = d[3].userID;
  console.log("actionToDo,itemID: ", actionToDo, itemID, collectionID, userID);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      itemID: itemID,
      actionToDo: actionToDo,
      collectionID: collectionID,
    },
  };
  console.log("przed delete: ", config);
  const response = await axios.delete(API_URL + "/me/" + itemID, config);

  const config2 = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    collectionID: collectionID,
    itemID: itemID,
    actionToDo: actionToDo,
    userID: userID,
  };
  console.log("przed put: ", data);
  await axios.put(API_URL + "/me/" + userID, data, config2);
  // return response.data;
};
const deleteItemFromCollection = async (token, d) => {
  const actionToDo = d[1].actionToDo;
  const itemID = d[0].itemID;
  const collectionID = d[2].collectionID;
  const userID = d[3].userID;

  const config2 = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    collectionID: collectionID,
    itemID: itemID,
    actionToDo: actionToDo,
    userID: userID,
  };
  console.log("przed put: ", data);
  await axios.put(API_URL + "/me/" + userID, data, config2);
  // return response.data;
};
const getAllTags = async () => {
  const response = await axios.get(API_URL + "/tags/Alltags");
  console.log(response, response.data);
  return response.data;
};
const findUsingTags = async (tag) => {
  const response = await axios.get(API_URL + "/tags/findUsingTags", {
    params: {
      tag: tag,
    },
  });
  console.log(response, response.data);
  return response.data;
};
const findForString = async (name) => {
  console.log("findForString");
  const response = await axios.get(API_URL + "/main/findForString", {
    params: {
      name: name,
    },
  });

  return response.data;
};
const getItem = async (itemID) => {
  const response = await axios.get(API_URL + "/item/" + itemID, {
    params: {
      itemID: itemID,
    },
  });
  return response.data;
};
const createItem = async (d, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      collectionID: d.collectionID,
      name: d.name,
      tags: d.tags,
    },
  };

  // console.log("configgg:  ", config);
  const response = await axios.post(API_URL + "/me/" + d.userID, d, config);
  console.log("response.data", response.data._id);
  const config2 = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    collectionID: d.collectionID,
    itemID: response.data._id,
    actionToDo: d.actionToDo,
  };
  await axios.put(API_URL + "/me/" + d.userID, data, config2);

  return response.data;
};
// const getUserCollections = async (userID) => {
//   const response = await axios.get(API_URL + "/" + userID, {
//     params: {
//       userID: userID,
//     },
//   });
//   return response.data;
// };

const itemsService = {
  getItems,
  getItem,
  createItem,
  getAllTags,
  findUsingTags,
  findForString,
  deleteItem,
  deleteItemFromCollection,
};

export default itemsService;
