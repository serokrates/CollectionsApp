import axios from "axios";

const API_URL = "/api/users/";

const getUsers = async (userID) => {
  const response = await axios.get(API_URL, {
    params: {
      id: userID,
    },
  });
  return response.data;
};

const deleteUser = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userID: userID[0],
      currentUserID: userID[1],
    },
  };

  const response = await axios.delete(API_URL + "me/" + userID[0], config);
  // if()
  // await authService.logout();
  return response.data;
};

const changeStatus = async (dataPut, token) => {
  const userID = dataPut[0];
  const statuss = dataPut[1];
  console.log(statuss)
  let data=''
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if(statuss==="admin" || statuss==="common"){
     data = {
      role: statuss,
      currentUserID: dataPut[2],
    };
  }else if(statuss==="active" || statuss==="blocked"){
     data = {
      status: statuss,
      currentUserID: dataPut[2],
    };
  }
  console.log(data)
  const response = await axios.put(API_URL + "me/" + userID, data, config);
  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
  changeStatus,
};

export default usersService;
