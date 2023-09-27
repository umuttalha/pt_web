import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis";
import Button from "@mui/material/Button";
import pb from "../lib/pocketbase";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import SwipeableEdgeDrawer from "../components/InfoDrawer";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import DragIcon from "@mui/icons-material/DragIndicator";

import { useMyContext } from "../UserContext";

const options = {
  layout: {
    randomSeed: 2,
    improvedLayout: false,
    // hierarchical:true,
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
};


export default function Map() {
  const { user } = useMyContext();

  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [network, setNetwork] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [openNode, setOpenNode] = useState(null);


const nodes = new DataSet([
  // { id: 1, label: "Node 1", color: "#8DDFCB" },
  // { id: 2, label: "Node 2" },
  // { id: 3, label: "Node 3" },
]);

const edges = new DataSet([
  // { from: 1, to: 2 },
  // { from: 2, to: 3 },
]);

const data = { nodes, edges };

async function fetchData() {
  const resultList = await pb.collection("interaction_nodes").getFullList({
    filter: 'user_id="7ptk0ly7mhowlw2"',
    expand: "node_id.infos.author",
  });

  for (let index = 0; index < resultList.length; index++) {
    const element = resultList[index];

    if (element.interaction == "like") {
      // console.log(element.expand.node_id);
      network.body.data.nodes.add({ id: element.expand.node_id.id, label: element.expand.node_id.title });
    }

    if (element.interaction == "notr") {
    }

    if (element.interaction == "dislike") {
    }
  }

  // console.log(resultList);
}


  useEffect(() => {
    const network1 = new Network(containerRef.current, data, options);

    setNetwork(network1)

    

    return () => {
      network1.destroy();
    };
  }, []);

  useEffect(() => {
    if (searchId != "") {
      network.body.data.nodes.add({ id: searchId.id, label: searchId.title });
      network.focus(searchId.id, {
        scale: 1, // Optional: You can specify the zoom level
        locked: true,
      });
    }
  }, [searchId]);

  const likeNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#8DDFCB";
      network.body.data.nodes.update(updatedNode);
    }
    getNeighbour(openNode);
    setOpen(false)
  };

  const notrNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#D2DE32";
      network.body.data.nodes.update(updatedNode);
    }
    getNeighbour(openNode);
    setOpen(false)
  };

  const dislikeNode = () => {
    const updatedNode = network.body.data.nodes.get(openNode);

    if (updatedNode) {
      updatedNode.color = "#C63D2F";
      network.body.data.nodes.update(updatedNode);
    }
    setOpen(false)
  };

  const getNeighbour = async (nodeId) => {
    network.body.data.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, color: "blue" };
      }
      return node;
    });

    const record = await pb.collection("nodes").getOne(nodeId, {
      expand: 'neighbour_nodes',
    });

    console.log(record)

    for (let i = 0; i < record.neighbour_nodes.length; i++) {
      console.log(record.neighbour_nodes[i]);

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

    console.log(network)

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

  const addNode = async () => {
    const record = await pb.collection("nodes").getOne("bmm3md7kprj6xmt", {
      // expand: "relField1,relField2.subRelField",
    });

    network.body.data.nodes.add({ id: record.id, label: record.title });
    network.body.data.edges.add({
      from: 1,
      to: record.id,
    });
  };

  function zoomIn() {
    const currentScale = network.getScale();
    const newScale = currentScale * 1.2;
    network.moveTo({ scale: newScale });
  }

  function zoomOut() {
    const currentScale = network.getScale();
    const newScale = currentScale / 1.2;
    network.moveTo({ scale: newScale });
  }

  return (
    <>
      <PersistentDrawerLeft setSearchId={setSearchId} />

      <Button
        variant="contained"
        onClick={addNode}
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
        <Button variant="contained" size="small" onClick={zoomIn} color="info">
          <ZoomInIcon />
        </Button>
        <Button variant="contained" size="small" onClick={zoomOut} color="info">
          <ZoomOutIcon />
        </Button>
      </div>
    </>
  );
}
