import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import block from "../images/block.svg";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Grid from "@mui/material/Grid";
import { deleteCollection } from "../features/collections/collectionsSlice";
import Title from "react-vanilla-tilt";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Menu from "@mui/material/Menu";
import { FormattedMessage } from "react-intl";

function CardBox() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [userID2, setUserID2] = useState();
  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState("");
  const deleteCol = (c) => {
    dispatch(deleteCollection(c));
    handleClose()
  };

  useEffect(() => {
    setHasRole(false);
    setRole("");
    setUserID2("");
    user ? setUserID2(user._id) : console.log("no user");
    if (user) {
      if (user.hasOwnProperty("role")) {
        setHasRole(true);
        setRole(user.role);
      }
    } else if (!user) {
      setHasRole(false);
      setRole("");
    }
  }, [user]);

  const { collections, topFiveItemNum, isLoading, isError, message } =
    useSelector((state) => state.collections);

  const [anchorEl, setAnchorEl] = useState(null);
  const [colToGo, setColToGo] = useState();
  const [userToGo, setUserToGo] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event, c, u) => {
    setAnchorEl(event.currentTarget);
    setColToGo(c);
    setUserToGo(u);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setColToGo("");
    setUserToGo("");
  };
  return (
    <>
      <Grid
        container
        textAlign="center"
        justifyContent="center"
        sx={{ mt: 5, mb: 5 }}
      >
        {collections.map(({ user }, key) => (
          <Grid Item>
            <Col>
              <Title
                style={{
                  maxWidth: "200px",
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "3%",
                }}
              >
                <Grid item>
                  <Card
                    style={{
                      borderImage:
                        "linear-gradient( to left ,#845EC2,#00C9A7)30",
                      borderWidth: "4px",
                      borderStyle: "solid",
                    }}
                  >
                    <img src={block} class="w-50 p-3 rounded mx-auto d-block" />
                    <Card.Body>
                      <Card.Title>{collections[key].name}</Card.Title>
                      <Card.Text>{collections[key].description}</Card.Text>

                      <Card.Text>
                        <strong>
                          <FormattedMessage id={"app.cardBox.topic"}>
                          </FormattedMessage>
                        </strong>
                        {collections[key].topic}
                        {/* {currentUrl === "http://localhost:3000/" ? ( */}
                        {currentUrl ===
                        "https://socialappmateusz.herokuapp.com/Main" ? (
                          topFiveItemNum.length ? (
                            <p>
                              <FormattedMessage id={"app.cardBox.items"}>
                              </FormattedMessage>
                              {topFiveItemNum[key].length}
                            </p>
                          ) : (
                            <></>
                          )
                        ) : (
                          <></>
                        )}
                      </Card.Text>

                      <DehazeIcon
                        key={collections[key]._id}
                        onClick={(e) =>
                          handleClick(
                            e,
                            collections[key]._id,
                            collections[key].userID
                          )
                        }
                      />
                      <Menu
                        key={key}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <Grid
                          container
                          textAlign="center"
                          justifyContent="center"
                          columns={1}
                          sx={{ maxWidth: 130, width: "auto" }}
                        >
                          {userID2 ? (
                            userID2 === userToGo ||
                            (hasRole && role === "admin") ? (
                              <>
                                <Grid Item>
                                  <Button
                                    value={collections[key].userID}
                                    size="sm"
                                    onClick={() => deleteCol(colToGo)}
                                  >
                                    <FormattedMessage id={"app.cardBox.delete"}>
                                    </FormattedMessage>
                                  </Button>
                                </Grid>
                                <Grid Item>
                                  <Link
                                    to={`/Collection?backUrl=${
                                      "edit " + colToGo+" "+userToGo
                                    }`}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    <Button
                                      value={collections[key]._id}
                                      size="sm"
                                    >
                                      <FormattedMessage id={"app.cardBox.editCollection"}>
                                      </FormattedMessage>
                                    </Button>
                                  </Link>
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )}
                          <Grid Item xs={12}>
                            <Link
                              to={`/UserCollection/${colToGo}?backUrl=${
                                colToGo + " " + userToGo
                              }`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button value={collections[key]._id} size="sm">
                                <FormattedMessage id={"app.cardBox.goToCol"}>
                                </FormattedMessage>
                              </Button>
                            </Link>
                          </Grid>
                          <Grid Item xs={12}>
                            <Link
                              to={`/UserProfile/${userToGo}?backUrl=${userToGo}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <Button value={userToGo} size="sm">
                                <FormattedMessage id={"app.cardBox.goToUser"}>
                                </FormattedMessage>
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </Menu>
                    </Card.Body>
                  </Card>
                </Grid>
              </Title>
            </Col>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CardBox;
