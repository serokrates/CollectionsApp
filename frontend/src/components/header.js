import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.css";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { findForString } from "../features/items/itemsSlice";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { chooseLanguage } from "../features/language/languageSlice";
function Header() {
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
    navigate("/Main");
  };
  const search = (e) => {
    e.preventDefault();
    console.log(nameData);

    dispatch(findForString(nameData));
    navigate("/SearchCollection");
    // if (currentUrl !== "http://localhost:3000/SearchCollection") {
    if (
      currentUrl !== "https://socialappmateusz.herokuapp.com/SearchCollection"
    ) {
      dispatch(findForString(nameData));
    }
  };
  const [language, setLanguage] = useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
    dispatch(chooseLanguage(event.target.value));
  };

  return (
    <Navbar expand="lg">
      <Container>
        <FormControl style={{minWidth:"110px"}}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value={"PL"}>PL</MenuItem>
            <MenuItem value={"EN"}>EN</MenuItem>
          </Select>
        </FormControl>
        <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
          <Button variant="outline-success">
            <FormattedMessage id={"app.header.home"}>
            </FormattedMessage>
          </Button>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="outline-success">
                <FormattedMessage id={"app.header.register"}>
                </FormattedMessage>
              </Button>
            </Link>
            {user ? (
              <Link to="/me" style={{ textDecoration: "none", color: "white" }}>
                <Button variant="outline-success">
                  <FormattedMessage id={"app.header.myProfile"}>
                  </FormattedMessage>
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {user && user.role && user.role === "admin" ? (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Dashboard"
              >
                <Button variant="outline-success">
                  <FormattedMessage id={"app.header.adminPanel"}>
                  </FormattedMessage>
                </Button>
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
              <FormattedMessage id={"app.header.search"}>
              </FormattedMessage>
            </Button>
          </Form>
          {user ? (
            <Button
              style={{ textDecoration: "none", color: "white" }}
              variant="outline-success"
              onClick={onLogout}
            >
              <FormattedMessage id={"app.header.logout"}>
              </FormattedMessage>
            </Button>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <Button variant="outline-success">
                <FormattedMessage id={"app.header.login"}>
                </FormattedMessage>
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
