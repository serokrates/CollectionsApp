import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
  createComment,
  getCommentsForID,
  reset,
  likesComment,
} from "../features/comments/commentsSlice";
import Box from "@mui/material/Box";
import CommentSection from "./CommentSection";
import socketIO from "socket.io-client";
// import { socket } from "../features/socket/socket";
const port = process.env.PORT || 5000;
// lokalnie
export const socket = socketIO.connect(`socialappmateusz.herokuapp.com`);
// heroku
// export const socket = socketIO.connect(`http://localhost:${process.env.PORT}`);

function MessageForm({ itemID }) {
  const { user } = useSelector((state) => state.auth);
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comments
  );
  console.log(comments.length);
  // console.log(itemID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const sendMessage = (itemID) => {
    socket.emit("post_comment", { message: itemID });
    console.log(
      "post_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_commentpost_comment"
    );
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else if (user) {
      // console.log(text);
      let d = {
        text: text,
        itemID: itemID,
        userID: user._id,
        actionToDo: "add",
      };
      await dispatch(createComment(d));

      await dispatch(getCommentsForID(itemID));
      sendMessage(itemID);
    }
  };

  // console.log(comments);
  const [text, setText] = useState("");
  // const [connected, setConnected] = useState(false);
  // // IT IS HERE
  // useEffect(() => {
  //   socket.emit("connection");
  //   const eventHandler = () => setConnected(true);
  //   socket.on("connected", eventHandler);
  //   // unsubscribe from event for preventing memory leaks
  //   return () => {
  //     socket.off("WELCOME_FROM_SERVER", eventHandler);
  //   };
  // }, []);
  useEffect(() => {
    console.log("RENDER [dispatch]");
    dispatch(getCommentsForID(itemID));
  }, [dispatch]);
  useEffect(() => {
    console.log("RENDER [comments]");
    // console.log("comments: ", comments);
  }, [comments]);
  useEffect(() => {
    socket.on("receive_comment", (data) => {
      if (data.message === itemID) {
        console.log("TAK TO JEST TEN ITEM: ", data);
        dispatch(getCommentsForID(data.message));
        // console.log(comments);
      }
    });
  }, [socket]);
  return (
    // <>
    //   {connected ? (
    <>
      <Grid item xs={8} sx={{ mt: "2%" }}>
        <Box align={"right"}>
          <form onSubmit={(e) => onSubmit(e)}>
            <textarea
              class="form-control "
              rows="3"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button type="submit" class="btn btn-dark px-2 mb-2 w-200">
              Add a comment
            </button>
          </form>
        </Box>
        {comments.length !== 0 ? (
          <Box>
            <CommentSection comments={comments} />
          </Box>
        ) : (
          <>NIE MA KOMENTARZY</>
        )}
      </Grid>
    </>
    //   ) : (
    //     <p>Not connected yet...</p>
    //   )}
    // </>
  );
}

export default MessageForm;
