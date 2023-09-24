import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Menu, MenuItem, Link, Grid, Collapse } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BugReportIcon from "@mui/icons-material/BugReport";
import PestControlIcon from "@mui/icons-material/PestControl";
import { Link as RouterLink } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";

import pb from "../lib/pocketbase";

const InfoCard = ({ infoId }) => {
  function shortenText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const maxLength = 30;

  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleClick = (info) => {
    if (selectedInfo === info) {
      setSelectedInfo(null); // Seçili bilgi zaten açıksa, kapat
    } else {
      setSelectedInfo(info); // Seçili bilgiyi ayarla
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [likedBy, setLikedBy] = useState([]);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    async function fetchData() {
      const record = await pb
        .collection("posts")
        .getOne(infoId, { requestKey: infoId });

      setContent(record.content);
      setTitle(record.title);
      setLikedBy(record.liked_by);
      setSource(shortenText(record.source, maxLength));
      setType(record.type);
      setTags(record.tags);

      const authorName = await pb
        .collection("users")
        .getOne(record.author, { requestKey: infoId });

      setAuthor(authorName.username);
    }
    fetchData();
  }, []);

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Card sx={{ marginTop: "16px", display: "flex" }}>
          <CardContent style={{ flex: "6" }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ marginLeft: "-4px", marginBottom: "4px" }}
            >
              <Chip label={type} />
              <Typography
                sx={{
                  fontSize: 20,
                  marginLeft: "6px",
                  marginBottom: "4px",
                }}
                color="text.secondary"
                gutterBottom
              >
                {title}
              </Typography>
            </Box>
            <span
              style={{
                fontSize: "12px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              Posted by{" "}
              <RouterLink to={`/${author}`} style={{ textDecoration: "none" }}>
                <span style={{ fontWeight: "bold" }}> {author}</span>
              </RouterLink>
            </span>

            <Box
              display="flex"
              alignItems="center"
              sx={{ marginLeft: "-4px", marginBottom: "4px" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {null != tags &&
                  tags.map((tag, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={tag}
                        variant="outlined"
                        style={{ height: "20px", marginRight: 3 }}
                      />
                    </Grid>
                  ))}

                {/* <Chip
              label="Chip falined"
              variant="outlined"
              style={{ height: "20px", marginRight: 3 }}
            />
            <Chip
              label="Chip Outlined"
              variant="outlined"
              style={{ height: "20px", marginRight: 3 }}
            />
            <Chip
              label="Chip Outl"
              variant="outlined"
              style={{ height: "20px", marginRight: 3 }}
            /> */}
              </Box>
            </Box>

            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              {content}
            </Typography>
            <span
              style={{
                color: "#717171",
                fontSize: "12px",
                marginRight: "6px",
                marginTop: "16px",
                display: "inline-block",
              }}
            >
              Link:
            </span>

            <Link
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ fontSize: "14px" }}
            >
              {source}
            </Link>
            {/* <CommentIcon onClick={() => handleClick(infoId)} sx={{marginLeft:"16px"}}/> */}
            {/* <div onClick={() => handleClick(infoId)} style={{marginTop:"6px",fontSize:"12px"}}> Comments</div> */}
          </CardContent>
          <CardActions
            sx={{
              flexDirection: "column",
              flex: "1",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <MoreHorizIcon
              fontSize="small"
              sx={{position:"relative",cursor: "pointer", marginBottom:"12px" }}
              onClick={handleClickMenu}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <BugReportIcon />
                Irrelevant
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <PestControlIcon />
                Inappropriate
              </MenuItem>
            </Menu>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  marginBottom: "4px",
                },
              }}
            >
              <ArrowCircleUpIcon sx={{ cursor: "pointer" }} />
              <span style={{ fontSize: 14 }}>12</span>
              <ArrowCircleDownIcon sx={{ cursor: "pointer" }} />
            </Box>

            <CommentIcon
              onClick={() => handleClick(infoId)}
              sx={{ marginTop: "18px", cursor: "pointer",marginRight:"6px" }}
            />

            
          </CardActions>
        </Card>
        <Collapse in={selectedInfo === infoId}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              marginTop: "2px",
              borderRadius: "8px",
            }}
          >
            <p>yorumlar</p>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default InfoCard;
