import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.css";
import block from "../images/block.svg";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { findForString } from "../features/items/itemsSlice";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
function Header() {
  const style = {
    background: "linear-gradient(rgba(250,0,0,0.5),transparent)",
    backgroundColor: "purple",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [nameData, setNameData] = useState("");
  const onChange = (e) => {
    console.log(nameData);
    setNameData(e.target.value);
    console.log(nameData);
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/");
  };
  const search = (e) => {
    e.preventDefault();
    console.log(nameData);

    dispatch(findForString(nameData));
    // setNameData(" ");
    navigate("/SearchCollection");
    if (currentUrl !== "http://localhost:3000/SearchCollection") {
      dispatch(findForString(nameData));
      // navigate("/SearchCollection", { state: { name: nameData } });
      // navigate("/SearchCollection");
      // setNameData("");
    }
  };
  useEffect(() => {}, [search]);
  return (
    <Navbar
      // bg="dark"
      expand="lg"
      // style={style}
    >
      <Container fluid>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Button variant="outline-success">Home</Button>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Link to="/">
              <Nav.Link href="#action1">Home</Nav.Link>
            </Link> */}

            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="outline-success">Register</Button>
            </Link>
            {user ? (
              <Link to="/me" style={{ textDecoration: "none", color: "white" }}>
                <Button variant="outline-success">My profile</Button>
              </Link>
            ) : (
              <></>
            )}
            {user && user.role && user.role === "admin" ? (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Dashboard"
              >
                <Button variant="outline-success">Dashboard</Button>
              </Link>
            ) : (
              <></>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={(e) => search(e)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onChange}
              value={nameData}
            />
            <Button
              style={{ textDecoration: "none", color: "white" }}
              variant="outline-success"
              onClick={search}
            >
              Search
            </Button>
          </Form>
          {user ? (
            <Button
              style={{ textDecoration: "none", color: "white" }}
              variant="outline-success"
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <Button variant="outline-success">Login</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
