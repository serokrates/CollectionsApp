import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems, reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";
import Button from "@mui/material/Button";
import ItemsBox from "../components/ItemsBox";
import Grid from "@mui/material/Grid";

function UserCollection() {
  const [open, setOpen] = useState(false);

  const { query, search } = useLocation();
  const backUrl = new URLSearchParams(search).get("backUrl");
  // const collectionID = new URLSearchParams(search).get("backUrl");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState("");
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  console.log(new URLSearchParams(search).get("backUrl"));

  const [userID, setUserID] = useState(backUrl.split(" ")[1]);
  const [collectionID, setCollectionId] = useState(backUrl.split(" ")[0]);

  const { collections } = useSelector((state) => state.collections);
  console.log(collections);
  useEffect(() => {
    dispatch(getItems(collectionID));
  }, []);
  useEffect(() => {
    setHasRole(false);
    setRole("");

    if (user) {
      if (user.hasOwnProperty("role")) {
        setHasRole(true);
        setRole(user.role);
      }
    } else if (!user) {
      setHasRole(false);
      setRole("");
    }
    // console.log(collections, isLoading, isError, message);
    // console.log("length: ", collections.length);
    dispatch(getItems(collectionID));
    if (isError) {
      //   console.log(message);
      setOpen(true);
      // onLogout();
      // navigate("/login");
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
      {/* <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            ERROR, you are not the owner
          </Alert>
        </Collapse>

      </Box> */}
      user collection
      <div>
        <h1>Welcome {user && user.name}</h1>
      </div>
      {/* <div class="text-center" onClick={sendMessage}> */}
      <div class="text-center">
        {user ? (
          (hasRole && role === "admin") || userID === user._id ? (
            <>
              <Link
                to={`/Item/?backUrl=${"create " + collectionID}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  sx={{
                    width: "170px",
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
                  create new item
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Grid
          container
          columns={{ xs: 2, sm: 8, md: 18, lg: 30 }}
          justifyContent="center"
        >
          <ItemsBox items={items} />
        </Grid>
      </div>
    </>
  );
}

export default UserCollection;
