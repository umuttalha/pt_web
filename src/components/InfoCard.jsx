import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Menu, MenuItem, Link } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BugReportIcon from "@mui/icons-material/BugReport";
import PestControlIcon from "@mui/icons-material/PestControl";

const InfoCard = () => {
  function shortenText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const maxLength = 30;
  const shortenedURL = shortenText(
    "https://en.wikipedia.org/wiki/Computer_engineering",
    maxLength
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ marginTop: "16px", display: "flex" }}>
      <CardContent style={{ flex: "6" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ marginLeft: "-4px", marginBottom: "4px" }}
        >
          <Chip label="Podcast" />
          <Typography
            sx={{
              fontSize: 20,
              marginLeft: "6px",
              marginBottom: "4px",
            }}
            color="text.secondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{ marginLeft: "-4px", marginBottom: "4px" }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Chip
              label="Chip Outlined"
              variant="outlined"
              style={{ height: "20px", marginRight: 3 }}
            />
            <Chip
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
            />

          </Box>
        </Box>

        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          Computational biology refers to the use of data analysis, mathematical
          modeling and computational simulationsComputational biology refers to
          the use of data analysis, mathematical modeling and computational
          simulations
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
          {shortenedURL}
        </Link>
      </CardContent>
      <CardActions
        sx={{
          flexDirection: "column",
          flex: "1",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
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
        <MoreHorizIcon
          fontSize="small"
          sx={{ marginTop: "20px", cursor: "pointer" }}
          onClick={handleClick}
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
      </CardActions>
    </Card>
  );
};

export default InfoCard;
