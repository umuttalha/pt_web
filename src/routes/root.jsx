import React from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


import "./root.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Root() {
  return (
    <>
      <PersistentDrawerLeft />

      {/* <SlidingText/> */}

      <Typography variant="h1" component="h2">
        <span className="team-name">P</span>azar <span className="team-name">Team</span>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </>
  );
}
