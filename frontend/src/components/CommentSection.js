import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Divider, Grid, IconButton, Paper } from "@mui/material";
import block from "../images/block.svg";
import {
  createComment,
  getCommentsForID,
  likesComment,
} from "../features/comments/commentsSlice";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import socketIO from "socket.io-client";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FormattedMessage } from "react-intl";
const port = process.env.PORT || 5000;
// lokalnie
export const socket = socketIO.connect(`socialappmateusz.herokuapp.com`);

function CommentSection({ comments }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sendMessage = (itemID) => {
    socket.emit("post_comment", { message: itemID });
  };
  const deleteComment = async (e) => {
    if (!user) {
    } else if (user) {
      let d = {
        itemID: comments[0].itemID,
        userID: user._id,
        commentID: e,
        actionToDo: "delete",
      };
      await dispatch(createComment(d));

      await dispatch(getCommentsForID(comments[0].itemID));
      sendMessage(comments[0].itemID);
    }
  };
  return (
    <>
      {comments.length !== 0 ? (
        <Box style={{ padding: 14 }} className="App">
          <h1 align={"left"}>
            <FormattedMessage id={"app.commentSection.comments"}>
            </FormattedMessage>
          </h1>
          <Paper
            style={{ padding: "40px 20px", border: 1, borderRadius: "10px" }}
          >
            {comments.map(({ user }, key) => (
              <>
                <Grid key={key} container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={block} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Box
                      style={{
                        wordWrap: "break-word",
                        width: "auto",
                        textAlign: "left",
                      }}
                    >
                      <FormattedMessage id={"app.viewItem.userID"}>
                      </FormattedMessage> 
                      {comments[key].userID}
                    </Box>
                    <Box
                      style={{
                        textAlign: "left",
                        width: "auto",
                        wordWrap: "break-word",
                        minHeight: "40%",
                        backgroundColor: "#f0f0f0",
                        border: 1,
                        borderRadius: "10px",
                      }}
                    >
                      {comments[key].text}
                    </Box>
                    <p
                      style={{
                        wordWrap: "break-word",
                        textAlign: "left",
                        color: "gray",
                      }}
                    >
                      <FormattedMessage id={"app.commentSection.added"}>
                      </FormattedMessage> 
                      {comments[key].createdAt}
                    </p>

                    <Grid container alignItems="center">
                      <Grid item xs={4} align={"right"}
                        variant="outline-success"
                        onClick={() =>
                          dispatch(
                            likesComment({
                              commentID: comments[key]._id,
                              actionToDo: "add",
                            })
                          )
                        }
                      >
                        <ThumbUpOffAltIcon/>
                      </Grid>
                      <Grid item xs={4}> 
                        <Tooltip
                          title={
                            <React.Fragment>
                              <FormattedMessage id={"app.commentSection.whoLikes"}>
                              </FormattedMessage> 
                              {comments[key].whoLikes.map(({ userID }, key) => (
                                <p key={key}> {userID}</p>
                              ))}
                            </React.Fragment>
                          }
                        >
                          <Box sx={{fontSize: 12}}>
                            <FormattedMessage id={"app.commentSection.likes"}>
                            </FormattedMessage>
                            {comments[key].whoLikes.length}
                          </Box>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4} align={"left"}
                        variant="outline-success"
                        onClick={() =>
                          dispatch(
                            likesComment({
                              commentID: comments[key]._id,
                              actionToDo: "delete",
                            })
                          )
                        }
                      >
                        <ThumbDownOffAltIcon/>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box sx={{pt:1}}>
                    <IconButton
                      onClick={() => deleteComment(comments[key]._id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  
                </Grid>
                <Divider sx={{ mt:10, backgroundColor:"black" }} />
              </>
              
            ))}
          </Paper>
        </Box>
      ) : (
        <p>NO COMMENTS</p>
      )}
    </>
  );
}

export default CommentSection;
