import React from "react";
import "./css/footer.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Grid from "@mui/material/Grid";
import githubLogo from "../images/githubLogo.svg";

function Footer() {
  return (
    <div className="footer">
      <Navbar expand="lg">
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
