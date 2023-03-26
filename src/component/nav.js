import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import logo from "../img/logo.png";
import "../style/styles.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <AppBar
      position="fixed"
      sx={{ padding: "5px", height: "5rem" }}
      style={{ backgroundColor: "#0a4275" }}
 
    >
      <Container maxWidth="xl">
        <Link to="/" className="no-underline black">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Your logo."
              src={logo}
            />
            <Typography
              variant="h6"
              className="some-text"
              noWrap
              component="a"
              sx={{
                ml: 2,
                display: { xs: "none", md: "flex" },
                // fontFamily: 'monospace',
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              WALAILAK UNIVERSITY <br /> RESEARCHER
            </Typography>
            <Typography
              variant="h5"
              className="some-text"
              noWrap
              component="a"
              href=""
              sx={{
                ml: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                //fontFamily: 'monospace',
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              RESEARCHER <br />
              WALAILAK UNIVERSITY
            </Typography>
          </Toolbar>
        </Link>
      </Container>
    </AppBar>
  );
}
