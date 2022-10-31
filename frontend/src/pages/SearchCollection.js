import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";

import ItemsBox from "../components/ItemsBox";

function SearchCollection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  const { itemsSearched, isError } = useSelector(
    (state) => state.items
  );
  useEffect(() => {
    if (isError) {
      onLogout();
      navigate("/Main");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError]);

  return (
    <>
      <div class="text-center">
        <ItemsBox items={itemsSearched} />
      </div>
    </>
  );
}

export default SearchCollection;
