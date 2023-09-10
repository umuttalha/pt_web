import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import SignInModal from "./StartModal";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";

import pb from "../lib/pocketbase";

function Navbar({setSearchId}) {
  const isDesktop = useMediaQuery("(min-width:800px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(pb.authStore.model);


  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleLogout = () => {
    setUser(pb.authStore.clear());
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} setSearchId={setSearchId} />
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {!isDesktop ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}

          <Typography variant="h6" component="span">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Pazar Team
            </Link>
            <Link
              to="/map"
              style={{
                textDecoration: "none",
                color: "red",
                marginLeft: "20px",
                fontSize: "18px",
              }}
            >
              Map
            </Link>
          </Typography>

          {isDesktop === true ? (
            <div>
              <Button
                color="inherit"
                onClick={openSearchModal}
                sx={{
                  color: "#016A70",
                  borderColor: "#016A70",
                  fontSize: 14,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  width: "100px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "#016A70",
                    color: "#fff",
                  },
                }}
              >
                <SearchIcon />
                Search
              </Button>
              {user ? (
                <Button color="error" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button color="inherit" onClick={handleOpenModal}>
                    Sign in
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Button
              color="inherit"
              onClick={openSearchModal}
              sx={{
                color: "#213555",
                borderColor: "#213555",
                fontSize: 14,
                fontWeight: "bold",
                textTransform: "uppercase",
                width: "100px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "#213555",
                  color: "#fff",
                },
              }}
            >
              <SearchIcon />
              Search
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {user ? (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" sx={{ color: "red" }} />
            </ListItem>
          ) : (
            <>
              <ListItem button onClick={handleOpenModal}>
                <ListItemText primary="Sign in" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <SignInModal
        setModalOpen={setModalOpen}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        setUser={setUser}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
}

export default Navbar;
