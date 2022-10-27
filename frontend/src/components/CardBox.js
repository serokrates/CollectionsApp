import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.css";
import block from "../images/block.svg";
// import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { browserHistory } from "react-router";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { deleteCollection } from "../features/collections/collectionsSlice";
import Title from "react-vanilla-tilt";
function CardBox({ id }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [userID2, setUserID2] = useState();
  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState("");
  const deleteCol = (c) => {
    console.log(c);
    dispatch(deleteCollection(c));
  };

  useEffect(() => {
    setHasRole(false);
    setRole("");
    setUserID2("");
    // currentUrl === "http://localhost:3000/"
    //   ? dispatch(getTopFiveCollections())
    //   : console.log("not http://localhost:3000/");
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
    // ? user.hasOwnProperty("role")
    //   ? setHasRole(true)
    //   : console.log("no role error")
    // : console.log("no user");
    // user
    // ? user.hasOwnProperty("role")
    //   ? setRole(user.role)
    //   : console.log("no role error")
    // : console.log("no user");
    console.log("user: ", user, "hasRole: ", hasRole, "role: ", role);
  }, [user]);
  // useEffect(() => {
  //   console.log("useEffect CARDBOX");
  //   currentUrl === "http://localhost:3000/"
  //     ? dispatch(getTopFiveCollections())
  //     : console.log(
  //         "notssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss http://localhost:3000/"
  //       );
  // }, []);

  const { collections, topFiveItemNum, isLoading, isError, message } =
    useSelector((state) => state.collections);
  console.log(topFiveItemNum);
  console.log(user);

  return (
    <>
      {collections.map(({ user }, key) => (
        <Grid Item>
          <Col align="center">
            <Title>
              <Card key={key}>
                <img src={block} class="w-50 p-3 rounded mx-auto d-block" />
                <Card.Body>
                  <Card.Title>{collections[key].name}</Card.Title>
                  <Card.Text>{collections[key].description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <strong>Topic: </strong>
                      {collections[key].topic}
                      {currentUrl === "http://localhost:3000/" ? (
                        topFiveItemNum.length ? (
                          <p>Items: {topFiveItemNum[key].length}</p>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                  <Grid container columns={2} justifyContent="center">
                    {userID2 ? (
                      userID2 === collections[key].userID ||
                      (hasRole && role === "admin") ? (
                        <>
                          <Button
                            value={collections[key].userID}
                            size="sm"
                            onClick={() => deleteCol(collections[key]._id)}
                          >
                            DELETE
                          </Button>
                          <Link
                            to={`/Collection?backUrl=${
                              "edit " + collections[key]._id
                            }`}
                          >
                            <Button value={collections[key]._id} size="sm">
                              Edit collection
                            </Button>{" "}
                          </Link>
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    <Link
                      to={`/UserCollection/${collections[key]._id}?backUrl=${
                        collections[key]._id + " " + collections[key].userID
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        value={collections[key]._id}
                        size="sm"
                        variant="outlined"
                        active
                      >
                        Go to collection
                      </Button>{" "}
                    </Link>
                    <Link
                      to={`/UserProfile/${collections[key].userID}?backUrl=${collections[key].userID}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="outlined"
                        value={collections[key].userID}
                        size="sm"
                        active
                      >
                        Go to user
                      </Button>
                    </Link>
                  </Grid>
                </Card.Body>
              </Card>
            </Title>
          </Col>
        </Grid>
      ))}
    </>
  );
}

export default CardBox;
