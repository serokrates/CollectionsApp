import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/items/itemsSlice";
import { logout, resetUser } from "../features/auth/authSlice";

import ItemsBox from "../components/ItemsBox";

function SearchCollection() {
  const location = useLocation();
  // console.log("route.params.user:  ", location.state.name);
  // const [stringName, setStringName] = useState("")
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
  const { itemsSearched, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  console.log(itemsSearched);
  // useEffect(() => {
  //   location.state.name
  //     ? dispatch(findForString(location.state.name))
  //     : console.log("no location.state.name");
  // }, []);
  useEffect(() => {
    // location.state.name
    //   ? dispatch(findForString(location.state.name))
    //   : console.log("no location.state.name");
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
        <ItemsBox items={itemsSearched} />
      </div>
    </>
  );
}

export default SearchCollection;
