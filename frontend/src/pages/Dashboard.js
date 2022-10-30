import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, reset } from "../features/users/usersSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";

function Dashboard() {
  function refreshPage() {
    window.location.reload(false);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  console.log(users, isLoading, isError, message);
  console.log(user);
  useEffect(() => {
    console.log(users, isLoading, isError, message);
    console.log("length: ", users.length);
    if (isError) {
      console.log(message);
      onLogout();
      navigate("/login");
    }
    if (!user) {
      navigate("/login");
    }
    console.log("USER ROLE: ", user.status, user.role);
    if (user.role !== "admin") {
      navigate("/");
    }
    if (user) {
      dispatch(getUsers(user._id));
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  return (
    <>
      {/* <Header /> */}
      <div>
        <h1>Welcome {user && user.name}</h1>
      </div>
      <div>
        <div class="form-check">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">check</th>
                <th scope="col">createdAt</th>
                <th scope="col">email</th>
                <th scope="col">status</th>
                <th scope="col">role</th>
                <th scope="col">updatedAt</th>
                <th scope="col">_id</th>
                <th scope="col">delete User</th>
                <th scope="col">unblock</th>
                <th scope="col">block</th>
              </tr>
            </thead>
            {users.length !== 0 ? (
              users.map(({ user }, key) => (
                <UserComponent key={key} user={users[key]} index={key} />
              ))
            ) : (
              <></>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
