import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCollections,
  reset,
} from "../features/collections/collectionsSlice";
import { logout, resetUser } from "../features/auth/authSlice";
import CardBox from "../components/CardBox";

function UserProfile() {
  const { search } = useLocation();
  const userID = new URLSearchParams(search).get("backUrl");
  console.log(new URLSearchParams(search).get("backUrl"));

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

  useEffect(() => {
    window.history.replaceState({}, document.title);
    dispatch(getUserCollections(userID));

    if (isError) {
      onLogout();
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  return (
    <>
      <CardBox />
    </>
  );
}

export default UserProfile;
