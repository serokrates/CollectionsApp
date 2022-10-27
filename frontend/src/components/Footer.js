import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import "./css/footer.css";
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
import Grid from "@mui/material/Grid";
import githubLogo from "../images/githubLogo.svg";
function Footer() {
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
    <div className="footer">
      <Navbar
        // bg="dark"
        expand="lg"
      >
        {/* <Link
              to={{ pathname: "https://github.com/serokrates" }}
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            ></Link> */}
        <Container fluid>
          <Grid container justifyContent="center">
            <a
              target="_blank"
              href="https://github.com/serokrates"
              style={{ textDecoration: "none", color: "black" }}
            >
              <img src={githubLogo} loading="lazy" />
              Mateusz Turek
            </a>
          </Grid>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
