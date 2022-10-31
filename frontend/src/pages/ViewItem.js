import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItem, reset } from "../features/items/itemsSlice";
import Grid from "@mui/material/Grid";
import MessageForm from "../components/MessageForm";
import block from "../images/block.svg";
import Box from "@mui/material/Box";
import { FormattedMessage } from "react-intl";

function ViewItem() {
  const { search } = useLocation();
  const itemID = new URLSearchParams(search).get("backUrl");
  const dispatch = useDispatch();
  const { item} = useSelector(
    (state) => state.items
  );
  useEffect(() => {
    dispatch(getItem(itemID));
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
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

        <Grid item>
          <FormattedMessage id={"app.itemsBox.name"}>
          </FormattedMessage> 
          {item.name}
        </Grid>

        <Grid item>ID: {item._id}</Grid>
        <Grid item sx={{ mt: 4 }}>
          <h4>
            <FormattedMessage id={"app.viewItem.userID"}>
            </FormattedMessage> 
            {item.userID}
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            luctus ut est sed faucibus. Duis bibendum ac ex vehicula
            laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
            interdum tortor. Quisque arcu quam, malesuada vel mauris et,
            posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
            In elit metus, efficitur lobortis nisi quis, molestie porttitor
            metus. Pellentesque et neque risus. Aliquam vulputate, mauris
            vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
            quam lectus vitae ex.
          </p>

          <p style={{ textAlign: "left" }}>
            <FormattedMessage id={"app.viewItem.created"}>
            </FormattedMessage> 
            {item.createdAt}
          </p>
        </Grid>
      </Grid>
      <MessageForm itemID={itemID} />
    </>
  );
}

export default ViewItem;
