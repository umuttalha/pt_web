import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { DataSet, Network } from "vis";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import pb from "../lib/pocketbase";
import PersistentDrawerLeft from "../components/NavbarDrawer";

const options = {
  layout: {
    randomSeed: 2,
    improvedLayout: false,
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
      highlight: "#797979",
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
    width: 2,
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
  const params = useParams();
  const username = params.username;

  const containerRef = useRef(null);

  const [network, setNetwork] = useState(null);

  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    if (searchId != "") {
      network.body.data.nodes.add({ id: searchId.id, label: searchId.title });
    }
  }, [searchId]);

  const nodes = new DataSet([
    // { id: 1, label: "Node 1" },
    // { id: 2, label: "Node 2" },
    // { id: 3, label: "Node 3" },
  ]);

  const edges = new DataSet([
    // { from: 1, to: 2 },
    // { from: 2, to: 3 },
  ]);

  const data = { nodes, edges };

  useEffect(() => {
    function fetchData() {
      try {
        // Verileri bir API'den almak için await kullanın
        // const authData = await pb.admins.authWithPassword('umut@gmail.com', 'Umut.talha12');
        // const records = await pb.collection('nodes').getFullList({
        //     sort: '-created',
        // });
      } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error);
      }
    }

    // async fonksiyonu çağırın
    fetchData();
  }, []); // B

  const likeNode = (nodeId) => {
    const updatedNode = network.body.data.nodes.get(nodeId);

    if (updatedNode) {
      updatedNode.color = "#8DDFCB";
      network.body.data.nodes.update(updatedNode);
    }
  };

  const notrNode = (nodeId) => {
    const updatedNode = network.body.data.nodes.get(nodeId);

    if (updatedNode) {
      updatedNode.color = "#D2DE32";
      network.body.data.nodes.update(updatedNode);
    }
  };

  const dislikeNode = (nodeId) => {
    const updatedNode = network.body.data.nodes.get(nodeId);

    if (updatedNode) {
      updatedNode.color = "#C63D2F";
      network.body.data.nodes.update(updatedNode);
    }
  };

  useEffect(() => {
    if (network) {
      network.on("click", async function (params) {
        // var clickedNodeId = params.nodes[0];
        if (params.nodes.length > 0) {
          likeNode(params.nodes[0]);

          network.body.data.nodes.map((node) => {
            if (node.id === params.nodes[0]) {

              console.log("asd")
              return { ...node, color: 'blue' };
            }
            return node;
          });

          const record = await pb.collection("nodes").getOne(params.nodes[0]);

          console.log(record);

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
              });
            } catch {}
          }
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

  const addNode = async () => {
    const record = await pb.collection("nodes").getOne("bmm3md7kprj6xmt", {
      expand: "relField1,relField2.subRelField",
    });

    network.body.data.nodes.add({ id: record.id, label: record.title });
    network.body.data.edges.add({
      from: 1,
      to: record.id,
    });
  };

  return (
    <>
      <PersistentDrawerLeft />

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
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
}
