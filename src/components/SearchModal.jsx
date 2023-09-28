import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useMyContext } from "../UserContext";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  TextField,
  Alert,
} from "@mui/material";


import pb from "../lib/pocketbase";

const SearchModal = ({ isOpen, onClose, setSearchId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsTopics, setSearchResultsTopics] = useState([]);
  const [searchResultsUsers, setSearchResultsUsers] = useState([]);
  const [displayedQuery, setDisplayedQuery] = useState("");

  const [value, setValue] = useState(0);

  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigate = useNavigate();

  const { theme } = useMyContext();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let timer;

    if (searchQuery) {
      timer = setTimeout(async () => {
        // const filterExpression = `(title~'${searchQuery}' || content~'${searchQuery}')`;

        const filterExpressionTopics = `title~'${searchQuery}'`;

        const recordsTopics = await pb.collection("nodes").getList(1, 9, {
          filter: filterExpressionTopics,
        });

        const filterExpressionUsers = `username~'${searchQuery}'`;

        const recordsUsers = await pb.collection("users").getList(1, 9, {
          filter: filterExpressionUsers,
        });

        setSearchResultsTopics(recordsTopics.items);
        setSearchResultsUsers(recordsUsers.items);

        setDisplayedQuery(searchQuery);
      }, 400);
    } else {
      setDisplayedQuery("");
      setSearchResultsTopics([]);
      setSearchResultsUsers([]);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleRecordClickTopic = (record) => {

    if (currentPath != "/map") {
      navigate("/map");
    } else {
      setSearchId(record);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
      
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          overflowY: "scroll", // Y ekseni boyunca kaydırma eklendi
          maxHeight: "80vh",  // 
        }}
      >
        {currentPath != "/map" && (
          <Alert severity="info">If you wanna search topic go /map page</Alert>
        )}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Search
        </Typography>

        <TextField
          id="outlined-basic"
          // label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Topics" />
          <Tab label="Users" />
        </Tabs>

        {value === 0 &&
          searchResultsTopics.map((record) => (
            <div key={record.id}>
              <Typography variant="body2">{record.title}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleRecordClickTopic(record)}
              >
                Detayları Görüntüle
              </Button>
            </div>
          ))}
        {value === 1 &&
          searchResultsUsers.map((record) => (
            <div key={record.id}>
              <Typography variant="body2">{record.username}</Typography>

              <Link
                to={`/${record.username}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                >
                  Detayları Görüntüle
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
