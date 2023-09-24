import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import { Paper, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoCard from "../components/InfoCard";
import { Collapse } from "@mui/material";
import { Card, CardContent } from "@mui/material";

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
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleClick = (info) => {
    if (selectedInfo === info) {
      setSelectedInfo(null); // Seçili bilgi zaten açıksa, kapat
    } else {
      setSelectedInfo(info); // Seçili bilgiyi ayarla
    }
  };

  useEffect(() => {
    async function fetchData() {
      const resultList = await pb.collection("interaction_nodes").getFullList({
        filter: 'user_id="7ptk0ly7mhowlw2" && interaction="like"',
        expand: "node_id.infos.author",
      });

      console.log(resultList);

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

        {/* {infoList.map((info) => (
        <div key={info.id}>
          <div
            onClick={() => handleClick(info)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100px',
              backgroundColor: 'blue',
              marginTop: '2px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <p>{info.expand.node_id.title}</p>
          </div>
          <Collapse in={selectedInfo === info}>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '8px',
                marginTop: '2px',
                borderRadius: '8px',
              }}
            >
              <p>{info.expand.node_id.title}</p>
            </div>
          </Collapse>
        </div>
      ))} */}

        {infoList.map((info) => (
          <div onClick={() => handleClick(info)} key={info.id}>
            <InfoCard infoId={info.id} />
          </div>
        ))}
      </Container>
    </>
  );
}
