import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import InfoCard from "./InfoCard";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "50%",
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
const shortenedURL = shortenText(
  "https://en.wikipedia.org/wiki/Computer_engineering",
  maxLength
);

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer({
  open,
  setOpen,
  likeNode,
  notrNode,
  dislikeNode,
}) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
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
        <div style={{ overflowY: "scroll", height: "100%", marginTop: "18px" }}>
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
              }}
            >
              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{ marginRight: "8px" }}
                onClick={likeNode}
              >
                Like
              </Button>
              <Button
                variant="contained"
                size="small"
                color="warning"
                sx={{ marginRight: "8px" }}
                onClick={notrNode}
              >
                Notr
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ marginRight: "8px" }}
                onClick={dislikeNode}
              >
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

            <InfoCard />
            <InfoCard />
          </StyledBox>
        </div>
      </SwipeableDrawer>
    </Root>
  );
}
