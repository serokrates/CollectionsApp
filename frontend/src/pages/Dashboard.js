import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers, reset } from "../features/users/usersSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";
import { FormattedMessage } from "react-intl";
function Dashboard() {

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

  useEffect(() => {
    if (isError) {
      console.log(message);
      onLogout();
      navigate("/login");
    }
    if (!user) {
      navigate("/login");
    }
    console.log("USER ROLE: ", user.status, user.role);
    if (!user.role && user.role !== "admin") {
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
      <div>
        <h1>
          <FormattedMessage id={"app.carduserCollection.welcome"}>
          </FormattedMessage> 
          {user && user.name}
        </h1>
      </div>
      <div>
        <div class="form-check">
          <table class="table" >
            <thead>
              <tr style={{textAlign:"center"}}>
                <th scope="col">#</th>
                <th scope="col"><FormattedMessage id={"app.dashboard.createdAt"}></FormattedMessage></th>
                <th scope="col">email</th>
                <th scope="col">status</th>
                <th scope="col"><FormattedMessage id={"app.dashboard.role"}></FormattedMessage></th>
                <th scope="col"><FormattedMessage id={"app.dashboard.updatedAt"}></FormattedMessage></th>
                <th scope="col">_id</th>
                <th scope="col"><FormattedMessage id={"app.dashboard.deleteUser"}></FormattedMessage></th>
                <th scope="col"><FormattedMessage id={"app.dashboard.unblock"}></FormattedMessage></th>
                <th scope="col"><FormattedMessage id={"app.dashboard.block"}></FormattedMessage></th>
                <th scope="col"><FormattedMessage id={"app.dashboard.grantAdmin"}></FormattedMessage></th>
                <th scope="col"><FormattedMessage id={"app.dashboard.revokeAdmin"}></FormattedMessage></th>
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
