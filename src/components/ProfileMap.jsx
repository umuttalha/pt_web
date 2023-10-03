import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis";
import Button from "@mui/material/Button";
import pb from "../lib/pocketbase";
import PersistentDrawerLeft from "./NavbarDrawer";
import SwipeableEdgeDrawer from "./InfoDrawer";
import { useMyContext } from "../UserContext";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export default function ProfileMap({ profileName }) {
  const { user, theme } = useMyContext();

  const containerRef = useRef(null);

  const [options, setoptions] = useState({
    layout: {
      randomSeed: 2,
      improvedLayout: false,
      hierarchical: true,
    },
    nodes: {
      fixed: {
        x: false,
        y: false,
      },
      shape: "dot",
      // scaling: {
      // label: true,
      // },
      shapeProperties: {
        interpolation: false,
      },
      color: {
        background: "#fff",
        border: "#8DDFCB",
        // highlight: "#8DDFCB",
      },

      size: 20,
      borderWidth: 1.5,
      borderWidthSelected: 2,
      font: {
        size: 15,
        align: "center",
        color: "#7D7C7C",
        bold: {
          color: "#bffdc0",
          size: 15,
          vadjust: 0,
          mod: "bold",
        },
      },
    },

    edges: {
      width: 1.5,
      color: {
        color: "#D0D0D0",
        highlight: "#797979",
        hover: "#797979",
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: true, scaleFactor: 1, type: "arrow" },
      },
      smooth: {
        type: "continuous",
        roundness: 0,
      },
    },

    physics: {
      adaptiveTimestep: true,
      barnesHut: {
        gravitationalConstant: -8000,
        centralGravity: 0.02, //
        springConstant: 0.04,
        springLength: 100,
      },
      stabilization: {
        iterations: 987,
      },
      maxVelocity: 5,
      minVelocity: 1,
    },
    interaction: {
      dragNodes: true,
      dragView: true,
      zoomView: true,
    },
  });

  const [open, setOpen] = useState(false);
  const [network, setNetwork] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [openNode, setOpenNode] = useState(null);

  const [infoList, setInfoList] = useState([]);

  async function fetchData() {
    const resultList = await pb.collection("interaction_nodes").getFullList({
      filter: `user_id.username="${profileName}"`,
      expand: "node_id.neighbour_nodes",
    });

    for (let index = 0; index < resultList.length; index++) {
      const element = resultList[index];

      if (element.interaction == 1) {
        if (network.body.data.nodes.get(element.expand.node_id.id) == null)
          network.body.data.nodes.add({
            id: element.expand.node_id.id,
            label: element.expand.node_id.title,
            color: "#8DDFCB",
          });

        if (element.expand.node_id.expand?.neighbour_nodes != undefined) {
          for (
            let alt_komsu = 0;
            alt_komsu < element.expand.node_id.expand?.neighbour_nodes.length;
            alt_komsu++
          ) {
            const element1 =
              element.expand.node_id.expand?.neighbour_nodes[alt_komsu];

            if (network.body.data.nodes.get(element1.id) == null)
              network.body.data.nodes.add({
                id: element1.id,
                label: element1.title,
              });

            network.body.data.edges.add({
              from: element.expand.node_id.id,
              to: element1.id,
              arrows: "from",
            });
          }
        }
      }

      if (element.interaction == 0) {
        if (network.body.data.nodes.get(element.expand.node_id.id) == null)
          network.body.data.nodes.add({
            id: element.expand.node_id.id,
            label: element.expand.node_id.title,
            color: "#D2DE32",
          });
        else
          network.body.data.nodes.update({
            id: element.expand.node_id.id,
            color: "#D2DE32",
          });
      }

      if (element.interaction == -1) {
        if (network.body.data.nodes.get(element.expand.node_id.id) == null)
          network.body.data.nodes.add({
            id: element.expand.node_id.id,
            label: element.expand.node_id.title,
            color: "#C63D2F",
          });
        else
          network.body.data.nodes.update({
            id: element.expand.node_id.id,
            color: "#C63D2F",
          });
      }
    }
  }

  const nodes = new DataSet([]);

  const edges = new DataSet([]);

  const data = { nodes, edges };

  const likeNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);
    if (updatedNode) {
    }
  };

  const notrNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);
    if (updatedNode) {
    }
  };

  const dislikeNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
    }
  };

  useEffect(() => {
    if (network) {
      fetchData();
      network.on("click", async function (params) {
        // var clickedNodeId = params.nodes[0];

        if (params.nodes.length > 0) {
          setOpenNode(params.nodes[0]);
          setOpen(true);
        }
      });
    }
  }, [network]);

  useEffect(() => {
    const network1 = new Network(containerRef.current, data, options);

    setNetwork(network1);

    return () => {
      network1.destroy();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "calc(70vh - 110px)",
          border: "1px solid",
        }}
      />

      <SwipeableEdgeDrawer
        open={open}
        setOpen={setOpen}
        likeNode={likeNode}
        notrNode={notrNode}
        dislikeNode={dislikeNode}
        openNode={openNode}
      />
    </>
  );
}
