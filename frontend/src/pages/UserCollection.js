import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getItems, reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";
import Header from "../components/header";
import Button from "@mui/material/Button";
import { useLocation, testvalue } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import ItemsBox from "../components/ItemsBox";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

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
      <Box sx={{ width: "100%" }}>
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
        {/* <Button
            disabled={open}
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Re-open
          </Button> */}
      </Box>
      user collection
      <div>
        <h1>Welcome {user && user.name}</h1>
      </div>
      {/* <div class="text-center" onClick={sendMessage}> */}
      <div class="text-center">
        {user ? (
          (hasRole && role === "admin") || userID === user._id ? (
            <>
              <Link to={`/Item/?backUrl=${"create " + collectionID}`}>
                <Button size="small">create new item</Button>
              </Link>
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <ItemsBox items={items} />
      </div>
    </>
  );
}

export default UserCollection;
