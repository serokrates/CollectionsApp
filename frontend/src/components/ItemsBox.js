import { Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import block from "../images/block.svg";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import {
  deleteItem,
  deleteItemFromCollection,
} from "../features/items/itemsSlice";
import Title from "react-vanilla-tilt";
import Col from "react-bootstrap/Col";
import { FormattedMessage } from "react-intl";

function ItemsBox({ items }) {
  const dispatch = useDispatch();

  const deleteI = (d) => {
    dispatch(deleteItem(d));
    dispatch(deleteItemFromCollection(d));
  };
  const options = {
    max: 30,
    scale: 1.0,
    speed: 1000,
  };
  return (
    <>
      <Grid
        container
        columns={{ xs: 2, sm: 8, md: 18, lg: 30 }}
        justifyContent="center"
      >
        {items.length && items ? (
          items.map(({ user }, key) => (
            <Grid item>
              <Col>
                <Title className="tilt" options={options}>
                  <Grid item key={key}>
                    <Card
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid container justify="space-between">
                        <Grid item xs={6} align="left">
                          <Link
                            to={`/ViewItem/${items[key]._id}?backUrl=${items[key]._id}`}
                            state={{ item: items[key] }}
                          >
                            <Button size="small">
                              <FormattedMessage id={"app.itemsBox.view"}>
                              </FormattedMessage>
                            </Button>
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
                          <FormattedMessage id={"app.itemsBox.name"}>
                          </FormattedMessage>
                          {items[key].name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <Box>
                            <FormattedMessage id={"app.itemsBox.tags"}>
                            </FormattedMessage>
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
            </Grid>
          ))
        ) : (
          <></>
        )}
        {/* </Row> */}
      </Grid>
    </>
  );
}

export default ItemsBox;
