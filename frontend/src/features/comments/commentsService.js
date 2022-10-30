import axios from "axios";

const API_URL = "/api/comment";

const getAllComments = async (collectionID) => {
  const response = await axios.get(API_URL + "/" + collectionID, {
    params: {
      collectionID: collectionID,
    },
  });
  return response.data;
};
const createComment = async (d, token) => {
  if (d.actionToDo === "add") {
    console.log(d);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // text, itemID, userID, actionToDo
      data: {
        text: d.text,
        itemID: d.itemID,
      },
    };

    // console.log("configgg:  ", config);
    const response = await axios.post(API_URL + "/", d, config);

    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data2 = {
      itemID: d.itemID,
      commentID: response.data._id,
      actionToDo: d.actionToDo,
      type: "comment",
    };
    console.log(data2);

    await axios.put(API_URL + "/add/" + d.itemID, data2, config2);

    return response.data;
  } else if (d.actionToDo === "delete") {
    console.log("delete the comment");
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data2 = {
      itemID: d.itemID,
      commentID: d.commentID,
      actionToDo: d.actionToDo,
      type: "comment",
    };
    console.log(data2);

    const response = await axios.put(
      API_URL + "/add/" + d.itemID,
      data2,
      config2
    );

    return response.data;
  }
};
const likesComment = async (d, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    commentID: d.commentID,
    actionToDo: d.actionToDo,
  };
  console.log(data);

  const response = await axios.put(
    API_URL + "/like/" + d.commentID,
    data,
    config
  );

  return response.data;
};
const getCommentsForID = async (itemID) => {
  const response = await axios.get(API_URL + "/", {
    params: {
      itemID: itemID,
    },
  });
  console.log(response);
  return response.data;
};

const itemsService = {
  getCommentsForID,
  createComment,
  likesComment,
};

export default itemsService;
