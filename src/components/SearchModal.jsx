import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Ekledik

import pb from "../lib/pocketbase";

const SearchModal = ({ isOpen, onClose,setSearchId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedQuery, setDisplayedQuery] = useState("");

  useEffect(() => {
    let timer;

    if (searchQuery) {
      timer = setTimeout(async () => {
        const filterExpression = `(title~'${searchQuery}' || content~'${searchQuery}')`;

        const records = await pb.collection("nodes").getList(1, 3, {
          filter: filterExpression,
        });

        setSearchResults(records.items);

        setDisplayedQuery(searchQuery);
      }, 800);
    } else {
      setDisplayedQuery("");
      setSearchResults([]);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleRecordClick = (record) => {
    setSearchId(record)
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
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Search
        </Typography>

        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchResults.map((record) => (
          <div key={record.id}>
            <Typography variant="body2">{record.title}</Typography>
            <Button
              variant="outlined"
              onClick={() => handleRecordClick(record)}
            >
              Detayları Görüntüle
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SearchModal;