import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopFiveCollections,
  reset,
} from "../features/collections/collectionsSlice";
import { getAllTags } from "../features/items/itemsSlice";
import CardBox from "../components/CardBox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { collections, isLoading, isError, message } = useSelector(
    (state) => state.collections
  );
  useEffect(() => {
    dispatch(getTopFiveCollections());
    dispatch(getAllTags());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);
  const { tags } = useSelector((state) => state.items);
  return (
    <Box>
      <Box>
        <CardBox collections={collections} />
      </Box>

      <Box>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 20 }}
          justifyContent="center"
        >
          {tags.map(({ user }, key) => (
            <Grid item key={tags[key]} sx={{ position: "relative", bottom: 0 }}>
              <Link
                to={`/TagCollection?backUrl=${tags[key]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box
                  sx={{
                    height: "auto",
                    borderRadius: "20px",

                    background:
                      "linear-gradient(to left,rgba(230, 203, 87,0.5),transparent)",
                    backgroundColor: "#44e2ce",
                  }}
                  px={1}
                  onClick={() => console.log(tags[key])}
                >
                  {tags[key]}
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Main;
