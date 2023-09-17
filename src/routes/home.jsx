import React from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import { Grid, Paper, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SlidingText from "../components/SlidingText";
import InfoCard from "../components/InfoCard";

import "./root.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <>
      <PersistentDrawerLeft />

      <Container>
        <Typography sx={{ fontSize: "32px" }}>
          Info of the topics you like
        </Typography>

        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </Container>
    </>
  );
}
