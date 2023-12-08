import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis";
import Button from "@mui/material/Button";
import pb from "../lib/pocketbase";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import SwipeableEdgeDrawer from "../components/InfoDrawer";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import DragIcon from "@mui/icons-material/DragIndicator";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import { useMyContext } from "../UserContext";

export default function Map() {
  const { user, theme } = useMyContext();

  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [network, setNetwork] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [options, setoptions] = useState({
    layout: {
      randomSeed: 2,
      improvedLayout: false,
      hierarchical: false,
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

  const [openNode, setOpenNode] = useState(null);

  const nodes = new DataSet([]);

  const edges = new DataSet([]);

  const data = { nodes, edges };

  async function fetchData() {
    const resultList = await pb.collection("interaction_nodes").getFullList({
      filter: `user_id="${user.id}"`,
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

            if (network.body.data.nodes.get(element1.id) == null) {
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
      }

      if (element.interaction == 0) {
        if (network.body.data.nodes.get(element.expand.node_id.id) == null) {
          network.body.data.nodes.add({
            id: element.expand.node_id.id,
            label: element.expand.node_id.title,
            color: "#D2DE32",
          });
        } else {
          network.body.data.nodes.update({
            id: element.expand.node_id.id,
            color: "#D2DE32",
          });
        }

        if (element.expand.node_id.expand?.neighbour_nodes != undefined) {
          for (
            let alt_komsu = 0;
            alt_komsu < element.expand.node_id.expand?.neighbour_nodes.length;
            alt_komsu++
          ) {
            const element1 =
              element.expand.node_id.expand?.neighbour_nodes[alt_komsu];

            if (network.body.data.nodes.get(element1.id) == null) {
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

  useEffect(() => {
    const network1 = new Network(containerRef.current, data, options);

    setNetwork(network1);

    return () => {
      network1.destroy();
    };
  }, [options]);

  useEffect(() => {
    if (searchId != "") {
      network.body.data.nodes.add({ id: searchId.id, label: searchId.title });
      network.focus(searchId.id, {
        scale: 1, // Optional: You can specify the zoom level
        locked: true,
      });
    }
  }, [searchId]);

  const likeNode = async () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#8DDFCB";
      network.body.data.nodes.update(updatedNode);
    }


    const data = {
      interaction: "1",
      user_id: user.id,
      node_id: updatedNode.id,
    };

    await pb.collection("interaction_nodes").create(data);

    getNeighbour(openNode);
    setOpen(false);
  };

  const notrNode = async () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#D2DE32";
      network.body.data.nodes.update(updatedNode);
    }

    const data = {
      interaction: "0",
      user_id: user.id,
      node_id: updatedNode.id,
    };

    await pb.collection("interaction_nodes").create(data);
    getNeighbour(openNode);
    setOpen(false);
  };

  const dislikeNode = async () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#C63D2F";
      network.body.data.nodes.update(updatedNode);
    }

    const data = {
      interaction: "-1",
      user_id: user.id,
      node_id: updatedNode.id,
    };

    await pb.collection("interaction_nodes").create(data);

    setOpen(false);
  };

  const getNeighbour = async (nodeId) => {
    network.body.data.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, color: "blue" };
      }
      return node;
    });

    const record = await pb.collection("nodes").getOne(nodeId, {
      expand: "neighbour_nodes",
    });

    for (let i = 0; i < record.neighbour_nodes.length; i++) {
      const komsu_node = await pb
        .collection("nodes")
        .getOne(record.neighbour_nodes[i]);

      try {
        network.body.data.nodes.add({
          id: komsu_node.id,
          label: komsu_node.title,
        });
      } catch {}

      try {
        network.body.data.edges.add({
          from: komsu_node.id,
          to: record.id,
          arrows: "from",
        });
      } catch {}
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

  const showNode = async () => {
    const record = await pb.collection("nodes").getOne("bmm3md7kprj6xmt", {
      // expand: "relField1,relField2.subRelField",
    });

    network.body.data.nodes.add({ id: record.id, label: record.title });
    network.body.data.edges.add({
      from: 1,
      to: record.id,
    });
  };

  // function zoomIn() {
  //   const currentScale = network.getScale();
  //   const newScale = currentScale * 1.2;
  //   network.moveTo({ scale: newScale });
  // }

  // function zoomOut() {
  //   const currentScale = network.getScale();
  //   const newScale = currentScale / 1.2;
  //   network.moveTo({ scale: newScale });
  // }

  function hierarchical() {
    const newOptions = {
      ...options,
      layout: {
        ...options.layout,
        hierarchical: true,
      },
    };
    setoptions(newOptions);
  }

  return (
    <>
      <PersistentDrawerLeft setSearchId={setSearchId} />

      <Button
        variant="contained"
        onClick={showNode}
        style={{
          zIndex: 2,
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFCC70",
        }}
      >
        Search Topic
      </Button>
      <SwipeableEdgeDrawer
        open={open}
        openNode={openNode}
        setOpen={setOpen}
        likeNode={likeNode}
        notrNode={notrNode}
        dislikeNode={dislikeNode}
      />
      <div
        ref={containerRef}
        style={{ width: "100%", height: "calc(100vh - 110px)" }}
      />

      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "10px",
          zIndex: 100,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={hierarchical}
          color="success"
          sx={{ marginRight: "8px" }}
        >
          <SystemUpdateAltIcon />
        </Button>
        {/* <Button variant="contained" size="small" onClick={zoomIn} color="info">
          <ZoomInIcon />
        </Button>
        <Button variant="contained" size="small" onClick={zoomOut} color="info">
          <ZoomOutIcon />
        </Button> */}
      </div>
    </>
  );
}
