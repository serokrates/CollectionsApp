import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
  createComment,
  getCommentsForID,
} from "../features/comments/commentsSlice";
import Box from "@mui/material/Box";
import CommentSection from "./CommentSection";
import socketIO from "socket.io-client";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendMessage = (itemID) => {
    socket.emit("post_comment", { message: itemID });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else if (user) {
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

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getCommentsForID(itemID));
  }, [dispatch]);

  useEffect(() => {
    socket.on("receive_comment", (data) => {
      if (data.message === itemID) {
        dispatch(getCommentsForID(data.message));
      }
    });
  }, [socket]);
  return (
    <>
      <Grid item xs={8} sx={{ mt: "2%" }}>
        <Box align={"right"}>
          <form onSubmit={(e) => onSubmit(e)}>
            <textarea
              class="form-control "
              rows="3"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <Button
              type="submit"
              size="small"
              sx={{
                width: "auto",

                background:
                  "linear-gradient(to left,rgba(230, 203, 87,0.5),transparent)",
                backgroundColor: "#44e2ce",
                color: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                textDecoration: "none",
              }}
            >
              <FormattedMessage id={"app.messageForm.addComment"}>
              </FormattedMessage>
            </Button>
          </form>
        </Box>
        {comments.length !== 0 ? (
          <Box>
            <CommentSection comments={comments} />
          </Box>
        ) : (
          <><FormattedMessage id={"app.messageForm.noComments"}></FormattedMessage></>
        )}
      </Grid>
    </>
  );
}

export default MessageForm;
