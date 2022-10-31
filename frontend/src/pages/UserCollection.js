import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems, reset } from "../features/items/itemsSlice";
import Button from "@mui/material/Button";
import ItemsBox from "../components/ItemsBox";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";

function UserCollection() {
  const { search } = useLocation();
  const backUrl = new URLSearchParams(search).get("backUrl");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { items,isError} = useSelector(
    (state) => state.items
  );

  const [userID, setUserID] = useState(backUrl.split(" ")[1]);
  const [collectionID, setCollectionId] = useState(backUrl.split(" ")[0]);

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
    dispatch(getItems(collectionID));
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError]);

  return (
    <>
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
                    pl:1,
                    pr:1,
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
                  <FormattedMessage id={"app.createNewItem.create"}>
                  </FormattedMessage>
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
