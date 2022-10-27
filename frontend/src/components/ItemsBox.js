import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import block from "../images/block.svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, testvalue } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageForm from "../components/MessageForm";
import Box from "@mui/material/Box";
import {
  deleteItem,
  deleteItemFromCollection,
} from "../features/items/itemsSlice";
import Title from "react-vanilla-tilt";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// import { getItems, reset, getItem } from "../features/items/itemsSlice";
function ItemsBox({ items }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [userID2, setUserID2] = useState();
  const { search } = useLocation();
  const backUrl = new URLSearchParams(search).get("backUrl");
  console.log(backUrl);
  // const [command, setCommand] = useState(backUrl.split(" ")[0]);
  // const [collectionID, setCollectionId] = useState(backUrl.split(" ")[1]);

  // const onSubmit = (e) => {
  //   const userData = {
  //     text: e.target.value,
  //   };
  // };

  // const deleteItem = (i) => {
  //   console.log(i, "  deleted");
  // };
  const deleteI = (d) => {
    dispatch(deleteItem(d));
    dispatch(deleteItemFromCollection(d));
  };
  useEffect(() => {
    console.log("updated: ", items);
    user ? setUserID2(user._id) : console.log("no user");
  }, [user, navigate]);
  const options = {
    max: 30,
    scale: 1.0,
    speed: 1000,
  };
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 8, md: 12, lg: 20 }}
      justifyContent="center"
    >
      <Row xs={1} sm={1} md={2} lg={4} className="g-6">
        {items.length && items ? (
          items.map(({ user }, key) => (
            <Col>
              <Title className="tilt" options={options}>
                <Grid item key={key}>
                  <Card
                    sx={{
                      // maxWidth: 345,
                      // width: 300,
                      // minWidth: 250,
                      // minHeight: 543,
                      // height: "auto",
                      width: "100%",
                    }}
                  >
                    <Grid container spacing={1} justify="space-between">
                      <Grid item xs={6} align="left">
                        <Link
                          to={`/ViewItem/${items[key]._id}?backUrl=${items[key]._id}`}
                          state={{ item: items[key] }}
                        >
                          <Button size="small">view</Button>
                        </Link>
                      </Grid>
                      <Grid item xs={6} align="right">
                        <Typography gutterBottom>
                          <IconButton
                            onClick={() =>
                              deleteI([
                                { itemID: items[key]._id },
                                { actionToDo: "delete" },
                                { collectionID: items[key].collectionID },
                                { userID: items[key].userID },
                              ])
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </Typography>
                      </Grid>
                    </Grid>
                    <CardMedia
                      component="img"
                      image={block}
                      alt={items[key]._id}
                      sx={{ maxHeight: 300, height: "auto" }}
                    />

                    <CardContent>
                      <Typography
                        sx={{ wordWrap: "break-word" }}
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        Name:
                        {items[key].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box>
                          Tags:
                          {items[key].tags.map(({ user }, key2) => (
                            <> {items[key].tags[key2].text},</>
                          ))}
                        </Box>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {items[key]._id}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Title>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
    </Grid>
  );
}

export default ItemsBox;
