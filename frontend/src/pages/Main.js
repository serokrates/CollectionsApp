import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getCollections,
  reset,
  getTopFiveCollections,
} from "../features/collections/collectionsSlice";
import { getAllTags } from "../features/items/itemsSlice";
import UserComponent from "../components/UserComponent";
import { logout, resetUser } from "../features/auth/authSlice";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardBox from "../components/CardBox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
function Main() {
  const style = {
    background: "linear-gradient(rgba(250,0,0,0.5),transparent)",
    backgroundColor: "purple",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { collections, isLoading, isError, message } = useSelector(
    (state) => state.collections
  );

  console.log(collections, isLoading, isError, message);
  console.log(user);
  useEffect(() => {
    console.log(collections, isLoading, isError, message);
    console.log("length: ", collections.length);
    dispatch(getTopFiveCollections());
    dispatch(getAllTags());

    if (isError) {
      console.log(message);
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
  const { tags } = useSelector((state) => state.items);
  console.log(tags);
  return (
    <>
      {/* <Header /> */}
      {/* <Box>
        <h1>Welcome {user && user.name}</h1>
      </Box> */}
      {/* <Box sx={{ border: 1, borderRadius: "16px" }}> */}

      <h4>Top 5 collections</h4>
      <Grid
        container
        columns={{ xs: 2, sm: 8, md: 18, lg: 30 }}
        justifyContent="center"
      >
        <CardBox collections={collections} />
      </Grid>
      <Box sx={{ mx: "6%", mt: "5%" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 20 }}
          justifyContent="center"
        >
          {tags.map(({ user }, key) => (
            <Grid item key={tags[key]}>
              <Link
                to={`/TagCollection?backUrl=${tags[key]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box
                  sx={{
                    height: "auto",
                    // border: 1,
                    borderRadius: "20px",

                    background:
                      "linear-gradient(to left,rgba(230, 203, 87,0.5),transparent)",
                    backgroundColor: "rgba(166, 10, 163)",
                  }}
                  px={1}
                  onClick={() => console.log(tags[key])}
                >
                  {tags[key]}
                </Box>
              </Link>
            </Grid>
            // <Box class="text-center"></Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Main;
