import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItems, reset } from "../features/items/itemsSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";
import Header from "../components/header";
import { findUsingTags } from "../features/items/itemsSlice";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import CardBox from "../components/CardBox";
import { useLocation, testvalue } from "react-router-dom";

import ItemsBox from "../components/ItemsBox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageForm from "../components/MessageForm";
import { Link } from "react-router-dom";

function TagCollection() {
  const { query, search } = useLocation();
  const tag = new URLSearchParams(search).get("backUrl");
  console.log(new URLSearchParams(search).get("backUrl"));
  const backUrl = new URLSearchParams(search).get("backUrl");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  console.log(items);
  useEffect(() => {
    dispatch(findUsingTags(tag));
  }, []);
  useEffect(() => {
    dispatch(findUsingTags(tag));
    if (isError) {
      //   console.log(message);
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
  }, [user, navigate, isError]);

  return (
    <>
      {/* <Header /> */}
      TagCollection
      <div class="text-center">
        <ItemsBox items={items} />
      </div>
    </>
  );
}

export default TagCollection;