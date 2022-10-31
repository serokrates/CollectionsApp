import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCollections,
  reset,
} from "../features/collections/collectionsSlice";
import { logout, resetUser } from "../features/auth/authSlice";
import CardBox from "../components/CardBox";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/system";
function UserProfile() {
  const { search } = useLocation();
  const userID = new URLSearchParams(search).get("backUrl");

  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { isError} =
    useSelector((state) => state.collections);

  useEffect(() => {
    setHasRole(false);
    setRole("");

    window.history.replaceState({}, document.title);
    dispatch(getUserCollections(userID));
    if (user) {
      if (user.hasOwnProperty("role")) {
        setHasRole(true);
        setRole(user.role);
      }
    } else if (!user) {
      setHasRole(false);
      setRole("");
    }
    if (isError) {
      onLogout();
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  return (
    <Box sx={{mt:10}} textAlign={"center"}>
    {user ? (
      (hasRole && role === "admin") || userID === user._id ? (
        <>
          <Link
          to={`/Collection?backUrl=${"create "+userID}`}
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
        </>
      ) : (
        <></>
      )
    ) : (
      <></>
    )}
        
      <CardBox/>
    </Box>
  );
}

export default UserProfile;
