import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  Menu,
  MenuItem,
  Link,
  Grid,
  Collapse,
  TextField,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BugReportIcon from "@mui/icons-material/BugReport";
import PestControlIcon from "@mui/icons-material/PestControl";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import pb from "../lib/pocketbase";

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const InfoCard = ({
  info_id,
  profile_user_id,
  profile_username,
  info_content,
  info_created,
  info_author,
  info_source,
  info_tags,
  info_title,
  info_type,
  setInfosIdList,
  infosIdList
}) => {
  
  function shortenText(text) {
    if (text.length > 30) {
      return text.substring(0, 30) + "...";
    }
    return text;
  }

  const [date, setDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const date = new Date(info_created);

    const formattedDate = date.toLocaleString("en-US", options);
    setDate(formattedDate);
  }, []);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClickDelete = async () => {
    const aaa = await pb.collection("posts").delete(info_id);

    if(setInfosIdList){
      const newInfosIdList = infosIdList.filter(item => item !== info_id);
      setInfosIdList(newInfosIdList)
    }
    
    setIsVisible(!isVisible);
  };

  const handleClickReportIrrelevant = async () => {
    const data = {
      report_user: profile_user_id,
      report_post: info_id,
      field: "Irrelevant",
    };

    await pb.collection("report").create(data);
    setAnchorEl(false);
  };

  const handleClickReportInappropriate = async () => {
    const data = {
      report_user: profile_user_id,
      report_post: info_id,
      field: "Inappropriate",
    };

    await pb.collection("report").create(data);
    setAnchorEl(false);
  };

  return (
    <>
      <div style={{ display: isVisible ? "block" : "none" }}>
        <div style={{ marginBottom: "16px" }}>
          <Card sx={{ marginTop: "16px", display: "flex" }}>
            <CardContent style={{ flex: "6" }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ marginLeft: "-4px", marginBottom: "4px" }}
              >
                <Chip label={info_type} />
                <Typography
                  sx={{
                    fontSize: 20,
                    marginLeft: "6px",
                    marginBottom: "4px",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {info_title}
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
                <RouterLink
                  to={`/${info_author}`}
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ fontWeight: "bold" }}> {info_author}</span>
                </RouterLink>
              </span>

              <Box
                display="flex"
                alignItems="center"
                sx={{ marginLeft: "-4px", marginBottom: "4px" }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {null != info_tags &&
                    info_tags.map((tag, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={tag}
                          variant="outlined"
                          style={{ height: "20px", marginRight: 3 }}
                        />
                      </Grid>
                    ))}
                </Box>
              </Box>

              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                {info_content}
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
                {info_source}
              </Link>

              <Typography
                variant="body1"
                sx={{ fontSize: "12px", marginTop: "4px" }}
              >
                {date}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                flexDirection: "column",
                flex: "1",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {profile_username == info_author ? (
                <CloseIcon
                  fontSize="small"
                  sx={{
                    marginLeft: "6px",
                    marginBottom: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClickDelete}
                />
              ) : (
                ""
              )}

              <MoreHorizIcon
                fontSize="small"
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  marginBottom: "12px",
                }}
                onClick={handleClickMenu}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClickReportIrrelevant}>
                  <BugReportIcon />
                  Irrelevant
                </MenuItem>
                <MenuItem onClick={handleClickReportInappropriate}>
                  <PestControlIcon />
                  Inappropriate
                </MenuItem>
              </Menu>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
