import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItems, reset, getItem } from "../features/items/itemsSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";
import Header from "../components/header";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import CardBox from "../components/CardBox";
import { useLocation, testvalue } from "react-router-dom";
import socketIO from "socket.io-client";
import ItemsBox from "../components/ItemsBox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageForm from "../components/MessageForm";
import { Link } from "react-router-dom";
import block from "../images/block.svg";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
// const port = process.env.PORT || 5000;
// const socket = socketIO.connect(`http://localhost:${port}`);
// const socket = socketIO.connect(`http://localhost:${process.env.PORT}`);
function ViewItem() {
  // const sendMessage = () => {
  //   // TODO add a comment then get comments and then add useEffect with getComment
  //   dispatch(getItems(collectionID));
  //   const ids = items.map(({ _id }) => _id);
  //   console.log(ids);
  //   socket.emit("post_comment", { message: ids });
  //   console.log("klik");
  // };
  // const location = useLocation();
  // const { item } = location.state;
  // console.log("itemitemitemitem", item);
  const { query, search } = useLocation();
  const itemID = new URLSearchParams(search).get("backUrl");
  console.log(new URLSearchParams(search).get("backUrl"));
  const backUrl = new URLSearchParams(search).get("backUrl");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { item, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  console.log("itemitemitemitemitemitem", item);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };

  useEffect(() => {
    // console.log(collections, isLoading, isError, message);
    // console.log("length: ", collections.length);
    dispatch(getItem(itemID));

    return () => {
      dispatch(reset());
    };
  }, []);

  // console.log(item.flat());

  // const s = item.tags;
  // const newasd = s.map(({ text }) => text);
  // console.log(newasd);
  // console.log(s[0].text);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid justifyContent="left" item xs={8}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box
              component="img"
              src={block}
              sx={{ width: 1 / 3, maxWidth: 253 }}
              loading="lazy"
            ></Box>

            <Grid itemRef="">Name: {item.name}</Grid>

            <Grid item>ID: {item._id}</Grid>
            <Grid item>
              {/* <h4>Michel Michel</h4>
              <p> */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
              {/* </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p> */}
            </Grid>
          </Grid>
        </Grid>
        <MessageForm itemID={itemID} />
      </Grid>
    </>
  );
}

export default ViewItem;
