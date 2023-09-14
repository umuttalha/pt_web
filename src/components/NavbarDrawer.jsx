import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import FlagIcon from '@mui/icons-material/Flag';

import { useMyContext } from "../UserContext";

import { Link } from "react-router-dom";
import SignInModal from "./StartModal";
import SearchModal from "./SearchModal";

import pb from "../lib/pocketbase";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  //renk
  backgroundColor: "#82A0D8",
  height: "64px",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ setSearchId }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user, setUser } = useMyContext();

  // const [user, setUser] = useState(pb.authStore.model);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {user ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}

          <Typography variant="h6" noWrap component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <img
                src="icon.png"
                alt="Your Image"
                style={{ width: "30px", marginTop: "5px" }}
              />
              <span
                style={{
                  marginLeft: "5px",
                  position: "relative",
                  marginBottom: "-3px",
                  display: "table-caption",
                }}
              >
                Pazar Team
              </span>
            </Link>
          </Typography>
          {user ? (
            <Button
              sx={{ position: "absolute", right: "12px", color: "white" }}
              onClick={openSearchModal}
            >
              <SearchIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ marginLeft: "auto", marginRight: "0" }}
              onClick={handleOpenModal}
            >
              <LoginIcon sx={{marginRight:1}}/> Start
            </Button>
            // <ListItem key={"Start"} disablePadding>
            //   <ListItemButton
            //     sx={{
            //       backgroundColor: "black",
            //       color: "white",
            //       borderRadius: 3,
            //       margin: 1,
            //       "&:hover": {
            //         backgroundColor: "black",
            //       },
            //     }}
            //   >
            //     <ListItemText
            //       primary={"Login & Sign Up"}
            //       sx={{ textAlign: "center" }}
            //     />
            //   </ListItemButton>
            // </ListItem>
          )}

          <SignInModal
            setModalOpen={setModalOpen}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            setUser={setUser}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {user ? (
          <>
            <List>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <ListItem key={"Home"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/map"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem key={"Map"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Map"} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem key={"Profile"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Profile"} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link
                to="/settings"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem key={"Settings"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                to="/addnode"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem key={"Add Node"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FlagIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Node"} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </>
        ) : (
          <></>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <SignInModal
          setModalOpen={setModalOpen}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={closeSearchModal}
          setSearchId={setSearchId}
        />
      </Main>
    </Box>
  );
}
