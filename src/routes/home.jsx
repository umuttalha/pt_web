import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import { Paper, Container, Typography, Button,Card ,CardContent,CardActions,IconButton} from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoCard from "../components/InfoCard";
import { useMyContext } from "../UserContext";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BlockIcon from '@mui/icons-material/Block';

import pb from "../lib/pocketbase";

import "./root.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [infoList, setInfoList] = useState([]);

  const { user } = useMyContext();

  console.log(user);

  // useEffect(() => {
  //   console.log("sea");

  //   async function fetchData() {
  //     const resultList = await pb.collection("interaction_nodes").getFullList({
  //       filter: `user_id="${user.id}" && interaction="1"`,
  //       expand: "node_id.infos.author",
  //     });

  //     console.log(resultList)
  //   }

  //   fetchData();
  // }, []);

  

  return (
    <>
      <PersistentDrawerLeft />

      <Container>
       
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Card style={{ height: '500px', width: '300px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Başlık
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kart içeriği burada yer alır. Bu kısım, kartın içine ekleyeceğiniz bilgileri içerir.
            </Typography>
          </CardContent>
          <div style={{ display: 'absolute',  top: '16px' }}>
            <IconButton color="primary" aria-label="like">
              <ThumbUpIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="dislike">
              <ThumbDownIcon />
            </IconButton>
            <IconButton color="default" aria-label="pass">
              <BlockIcon />
            </IconButton>
          </div>
        </Card>
      </div>


      </Container>
    </>
  );
}
