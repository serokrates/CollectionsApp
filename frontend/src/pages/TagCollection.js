import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findUsingTags, reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";

import ItemsBox from "../components/ItemsBox";

function TagCollection() {
  const { query, search } = useLocation();
  const tag = new URLSearchParams(search).get("backUrl");
  console.log(new URLSearchParams(search).get("backUrl"));
  const backUrl = new URLSearchParams(search).get("backUrl");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  console.log(items);
  useEffect(() => {
    dispatch(findUsingTags(tag));
  }, []);
  useEffect(() => {
    dispatch(findUsingTags(tag));
    if (isError) {
      //   console.log(message);
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
  }, [user, navigate, isError]);

  return (
    <>
      {/* <Header /> */}
      TagCollection
      <div class="text-center">
        <ItemsBox items={items} />
      </div>
    </>
  );
}

export default TagCollection;
