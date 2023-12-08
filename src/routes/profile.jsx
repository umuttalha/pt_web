import React, { useState, useEffect } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import pb from "../lib/pocketbase";
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
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";

export default function Profile() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [totalInfoCount, settotalInfoCount] = useState("");

  const [profile, setProfile] = useState("");
  2;
  const profileName = currentPath.slice(1);

  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resultList = await pb.collection("posts").getList(1, 7, {
        filter: `author.username='${profileName}'`,
        expand: "author",
      });

      const profileInfos = await pb
        .collection("users")
        .getFirstListItem(`username="${profileName}"`);

      setProfile(profileInfos);

      settotalInfoCount(resultList.totalItems);
      setInfoList(resultList.items);
    }

    fetchData();
  }, []);

  console.log(profile);

  return (
    <>
      <PersistentDrawerLeft />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} style={{ marginBottom: "12px" }}>
            <div style={{ textAlign: "center" }}>
              {profile != "" ? (
                <>
                  <Typography variant="h4">{profileName}</Typography>
                  <Typography variant="body1">
                    Added Info: {totalInfoCount}
                  </Typography>
                </>
              ) : (
                "Profile not found"
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "16px",
                  marginTop: "8px",
                }}
              >
                {profile.profile_reddit ? (
                  <RedditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(profile.profile_reddit, "_blank")
                    }
                  />
                ) : (
                  ""
                )}
                {profile.profile_facebook ? (
                  <FacebookIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(profile.profile_facebook, "_blank")
                    }
                  />
                ) : (
                  ""
                )}
                {profile.profile_pinterest ? (
                  <PinterestIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(profile.profile_pinterest, "_blank")
                    }
                  />
                ) : (
                  ""
                )}
                {profile.profile_instagram ? (
                  <InstagramIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(profile.profile_instagram, "_blank")
                    }
                  />
                ) : (
                  ""
                )}
                {profile.profile_twitter ? (
                  <TwitterIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(profile.profile_twitter, "_blank")
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              {/* <Button variant="contained" color="primary">
                Takip Et
              </Button> */}
            </div>
          </Grid>

          {profile != "" ? (
            <Grid
              item
              xs={12}
              md={12}
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProfileMap profileName={profileName} />
            </Grid>
          ) : (
            ""
          )}

          {infoList.map((info) => (
            <Grid
              item
              xs={12}
              md={4}
              key={info.id}
              style={{ marginBottom: "20px" }}
            >
              <InfoCard
                info_id={info.id}
                profile_user_id={profile.id}
                profile_username={profile.username}
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
