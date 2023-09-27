import React, { useState, useEffect } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import pb from "../lib/pocketbase";
import { useMyContext } from "../UserContext";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const currentPath = location.pathname;

  const profileName = currentPath.slice(1);

  console.log(profileName)

  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resultList = await pb.collection("posts").getList(1, 3, {
        filter: `author.username='${profileName}'`,
        expand: "author",
      });

      // const mapList = await pb.collection("interaction_nodes").getFullList({
      //   filter: `user_id.username="${profileName}"`,
      //   expand: "node_id.infos.author",
      // });

      // console.log(mapList)
      setInfoList(resultList.items);
    }

    fetchData();
  }, []);

  //profile name ile user aynı ise başka component dönsün card componentleri silinebilir olsun falan. info card ın içinde de yapılabilir bu.

  // if username not exist return 404 page yoksa normak alttaki conponenti return de

  return (
    <>
      <PersistentDrawerLeft />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} style={{ marginBottom: "12px" }}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4">{profileName}</Typography>
              <Typography variant="body1">Added Info: 4</Typography>
              <Typography variant="body1">interested topic: 36</Typography>
              <Button variant="contained" color="primary">
                Takip Et
              </Button>
            </div>
          </Grid>

          <ProfileMap />

          {infoList.map((info) => (
            <Grid
              item
              xs={12}
              md={4}
              key={info.id}
              style={{ marginBottom: "20px" }}
            >
              <InfoCard
                info_content={info.content}
                info_created={info.created}
                info_author={info.expand.author.username}
                info_source={info.source}
                info_tags={info.tags}
                info_title={info.title}
                info_type={info.type}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
