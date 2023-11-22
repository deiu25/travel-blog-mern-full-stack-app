import React, { useState } from "react";
import {
  AppBar,
  Tab,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Box,
  Hidden,
} from "@mui/material";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const linksArr = ["home", "diaries", "auth"];
const loggedInLinks = ["home", "diaries", "add", "profile"];

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = (links) => (
    links.map((link) => (
        <Tab
          LinkComponent={Link}
          to={`/${link === "home" ? "" : link}`}
          sx={{
            color: "black",
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
              textUnderlineOffset: "18px",
            },
          }}
          label={link}
          onClick={toggleDrawer(false)}
          key={link}
        />
    ))
  );

  return (
    <AppBar sx={{ bgcolor: "white" }}>
      <Toolbar>
        <Link to="/">
          <ModeOfTravelIcon sx={{ color: "black" }} />
        </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black", ml: 3 }}
        >
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            SyntaxSeeker Travel Diary
          </Link>
        </Typography>
        <Hidden smUp>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {isLoggedIn ? list(loggedInLinks) : list(linksArr)}
          </Box>
        </Hidden>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {isLoggedIn ? list(loggedInLinks) : list(linksArr)}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;