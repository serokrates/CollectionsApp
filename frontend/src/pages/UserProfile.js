import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUserCollections,
  reset,
  getTopFiveCollections,
} from "../features/collections/collectionsSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardBox from "../components/CardBox";
import { useLocation, testvalue } from "react-router-dom";
import Grid from "@mui/material/Grid";
function UserProfile() {
  const { search } = useLocation();
  const userID = new URLSearchParams(search).get("backUrl");
  console.log(new URLSearchParams(search).get("backUrl"));
  // function refreshPage() {
  //   window.location.reload(false);
  // }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { collections, topFiveItemNum, isLoading, isError, message } =
    useSelector((state) => state.collections);

  //   console.log(collections, isLoading, isError, message);
  //   console.log(user);
  useEffect(() => {
    // https://stackoverflow.com/questions/40099431/how-do-i-clear-location-state-in-react-router-on-page-reload
    window.history.replaceState({}, document.title);
    // console.log(collections, isLoading, isError, message);
    // console.log("length: ", collections.length);
    dispatch(getUserCollections(userID));
    // dispatch(getTopFiveCollections());
    if (isError) {
      onLogout();
      navigate("/login");
    }
    if (!user) {
      //   navigate("/login");
    }
    if (user) {
      //   dispatch(getCollections());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  return (
    <>
      {/* <Header /> */}
      {/* <div>
        <h1>Welcome {user && user.name}</h1>
      </div> */}
      <Grid
        sx={{ mt: "5%" }}
        container
        columns={{ xs: 2, sm: 8, md: 12, lg: 20 }}
        justifyContent="center"
      >
        <CardBox />
      </Grid>
    </>
  );
}

export default UserProfile;
