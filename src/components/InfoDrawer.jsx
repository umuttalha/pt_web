import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { IconButton, Menu, MenuItem, Link } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportIcon from "@mui/icons-material/Report";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BugReportIcon from '@mui/icons-material/BugReport';
import PestControlIcon from '@mui/icons-material/PestControl';

import InfoCard from "./InfoCard";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));



function shortenText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}
const maxLength = 30;
const shortenedURL = shortenText("https://en.wikipedia.org/wiki/Computer_engineering", maxLength);



const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {open ? "2 info" : ""}
          </Typography>
        </StyledBox>
        <div style={{ overflowY: "scroll", height: "100%" }}>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "scroll-y",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{ marginBottom: "4px", marginTop: "6px" }}
            >
              Computer engineering
            </Typography>
            <Box
              sx={{
                marginBottom: "12px",
                marginTop: "8px",
                "& > *": {
                  marginRight: "8px",
                },
              }}
            >
              <Button variant="contained" size="small" color="success">
                Like
              </Button>
              <Button variant="contained" size="small" color="warning">
                Notr
              </Button>
              <Button variant="contained" size="small" color="error">
                Dislike
              </Button>
            </Box>

            <Grid container spacing={1}>
              <Grid item>
                <Chip label="Mail Filtering" size="small" />
              </Grid>
              <Grid item>
                <Chip label="Computer Hardware Development" size="small" />
              </Grid>
              <Grid item>
                <Chip label="Embedded Systems Development" size="small" />
              </Grid>
            </Grid>

            <Typography component="div" sx={{ marginTop: "20px" }}>
              Computer engineering (CoE or CpE) is a branch of electronic
              engineering and computer science that integrates several fields of
              computer science and electronic engineering required to develop
              computer hardware and software. Computer engineers require
              training in electronic engineering, computer science,
              hardware-software integration, software design, and software
              engineering. It uses the techniques and principles of electrical
              engineering and computer science, and can encompass areas such as
              artificial intelligence (AI), robotics, computer networks,
              computer architecture, and operating systems. Computer engineers
              are involved in many hardware and software aspects of computing,
              from the design of individual microcontrollers, microprocessors,
              personal computers, and supercomputers, to circuit design. This
              field of engineering not only focuses on how computer systems
              themselves work but also on how to integrate them into the larger
              picture. Robotics is one of the applications of computer
              engineering.
            </Typography>

            <InfoCard/>
            <InfoCard/>
            
          </StyledBox>
        </div>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
