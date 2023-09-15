import PersistentDrawerLeft from "../components/NavbarDrawer";

import pb from "../lib/pocketbase";
import { useMyContext } from "../UserContext";
import { Link } from "react-router-dom";
import InfoCard from "../components/InfoCard";

import {
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Container,
} from "@mui/material";

import ProfileMap from "../components/ProfileMap";

function CenteredBox({ children }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.05)",
        fontSize: 18,
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}
export default function Profile() {
  const { user } = useMyContext();

  return (
    <>
      <PersistentDrawerLeft />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} style={{ marginBottom: "12px" }}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4">{user.username}</Typography>
              <Typography variant="body1">Added Info: 4</Typography>
              <Typography variant="body1">interested topic: 36</Typography>
              <Button variant="contained" color="primary">
                Takip Et
              </Button>
            </div>
          </Grid>

          <ProfileMap />

          <Grid item xs={12} md={4} sm={6} style={{marginBottom:"40px"}}>
            <CenteredBox>Title</CenteredBox>
            <InfoCard />
          </Grid>
          <Grid item xs={12} md={4} sm={6} style={{marginBottom:"40px"}}>
            <CenteredBox>Title</CenteredBox>
            <InfoCard />
          </Grid>
          <Grid item xs={12} md={4} sm={6} style={{marginBottom:"40px"}}>
            <CenteredBox>Title</CenteredBox>
            <InfoCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
