import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import { Paper, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoCard from "../components/InfoCard";

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

  useEffect(() => {
    async function fetchData() {
      const resultList = await pb.collection("interaction_nodes").getFullList({
        filter: 'user_id="7ptk0ly7mhowlw2" && interaction="like"',
        expand: "node_id.infos.author",
      });

      const allInfos = [];
      resultList.forEach((node) => {
        if (
          node?.expand?.node_id?.expand?.infos &&
          node?.expand?.node_id?.expand?.infos.length > 0
        ) {
          node.expand.node_id.expand.infos.forEach((info) => {
            allInfos.push(info);
          });
        }
      });

      //toDo tarihe göre sort olsun bu çalışmıyor

      allInfos.sort((a, b) => new Date(b.updated) - new Date(a.updated));

      setInfoList(allInfos);
    }

    fetchData();
  }, []);

  return (
    <>
      <PersistentDrawerLeft />

      <Container>
        <Typography sx={{ fontSize: "32px" }}>
          Info of the topics you like
        </Typography>

        {infoList.map((info) => (
          <div key={info.id}>
            <InfoCard
              info_content={info.content}
              info_created={info.created}
              info_author={info.expand.author.username}
              info_source={info.source}
              info_tags={info.tags}
              info_title={info.title}
              info_type={info.type}
            />
          </div>
        ))}

        {/* {infoList.map((info) => (
          <div onClick={() => handleClick(info)} key={info.id}>
            <InfoCard infoId={info.id} />
          </div>
        ))} */}
      </Container>
    </>
  );
}
