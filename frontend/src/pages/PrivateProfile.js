import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCollections,
  reset,
} from "../features/collections/collectionsSlice";
import Button from "@mui/material/Button";
import CardBox from "../components/CardBox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FormattedMessage } from "react-intl";

function PrivateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isError } = useSelector(
    (state) => state.collections
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    dispatch(getUserCollections(user._id));

    if (!user) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  return (
    <>
      <Box sx={{ mt: 2}} textAlign="center">
        <h1>
          <FormattedMessage id={"app.carduserCollection.welcome"}>
          </FormattedMessage> 
          {user && user.name}
        </h1>
      </Box>
      <Box sx={{ mt: 2 }} textAlign="center">
        <Link
          to={`/Collection?backUrl=${"create"}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            size="small"
            sx={{
              width: "auto",
              borderRadius: "20px",
              background:
                "linear-gradient(to left,rgba(230, 203, 87,0.5),transparent)",
              backgroundColor: "#44e2ce",
              color: "white",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              textDecoration: "none",
            }}
          >
            <FormattedMessage id={"app.createNewCollection.create"}>
            </FormattedMessage> 
          </Button>
        </Link>
        <Grid
          container
          columns={{ xs: 2, sm: 8, md: 18, lg: 30 }}
          justifyContent="center"
        >
          <CardBox />
        </Grid>
      </Box>
    </>
  );
}

export default PrivateProfile;
