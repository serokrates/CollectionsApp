import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import block from "../images/block.svg";
import unblock from "../images/unblock.svg";
import { changeStatus, deleteUser } from "../features/users/usersSlice";
import { logout, resetUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function UserComponent({ user, index }) {
  const navigate = useNavigate();
  const [stateCustomer, setCustomerState] = useState([]);
  const dispatch = useDispatch();
  const userCurrent = useSelector((state) => state.auth).user;

  const deleteAndLogout = (id) => {
    dispatch(deleteUser([id, userCurrent._id]));
    if (userCurrent._id === id) {
      dispatch(logout());
      dispatch(resetUser());
      navigate("/login");
    }
  };
  const blockAndLogout = (id) => {
    dispatch(changeStatus([id, "blocked", userCurrent._id]));

    if (userCurrent._id === id) {
      dispatch(logout());
      dispatch(resetUser());
      navigate("/login");
    }
  };
  const activateUser = (id) => {
    dispatch(changeStatus([id, "active", userCurrent._id]));
  };
  return (
    <tbody>
      <tr>
        <th scope="row">{index}</th>
        <td>
          <input type="checkbox" value="" id="flexCheckDefault" />
        </td>
        <td>{user.createdAt}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.role}</td>
        <td>{user.updatedAt}</td>
        <td>{user._id}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => deleteAndLogout(user._id)}
          >
            Delete
          </button>
        </td>
        <td>
          <img
            src={unblock}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => activateUser(user._id)}
          />
        </td>
        <td>
          <img
            src={block}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => blockAndLogout(user._id)}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default UserComponent;
