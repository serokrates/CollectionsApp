import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findUsingTags, reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";

import ItemsBox from "../components/ItemsBox";

function TagCollection() {
  const { search } = useLocation();
  const tag = new URLSearchParams(search).get("backUrl");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const {user} = useSelector((state) => state.auth);
  const {items, isError} = useSelector(
    (state) => state.items
  );
  useEffect(() => {
    dispatch(findUsingTags(tag));
  }, []);
  useEffect(() => {
    dispatch(findUsingTags(tag));
    if (isError) {
      onLogout();
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError]);

  return (
    <>
      <div class="text-center">
        <ItemsBox items={items} />
      </div>
    </>
  );
}

export default TagCollection;
