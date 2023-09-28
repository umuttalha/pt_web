import React, { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import InfoCard from "./InfoCard";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { useMyContext } from "../UserContext";

import pb from "../lib/pocketbase";

const Root = styled("div")(({ theme }) => ({
  height: "50%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

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

export default function SwipeableEdgeDrawer({
  open,
  setOpen,
  likeNode,
  notrNode,
  dislikeNode,
  openNode,
}) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [addInfoModalOpen, setAddInfoModalOpen] = useState(false);
  const { user } = useMyContext();

  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addSource, setAddSource] = useState("");
  const [addSelectedOption, setAddSelectedOption] = useState("");
  const [addAlertVisible, setAddAlertVisible] = useState(false);

  const [addTags, setAddTags] = useState([]);
  const [addTagInput, setAddTagInput] = useState("");

  const handleTagInputChange = (e) => {
    setAddTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== "") {
      setTags([...addTags, tagInput.trim()]);
      setAddTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const updatedTags = addTags.filter((tag) => tag !== tagToDelete);
    setAddTags(updatedTags);
  };

  const options = ["Article", "Book", "Video", "Podcast", "Course"];

  const handleSave = () => {
    // Verileri kaydetme işlemlerini burada yapabilirsiniz.
    // Örneğin, bu verileri bir API'ye gönderebilirsiniz.
    // Verileri sıfırla ve modalı kapat

    if (!addTitle || !addSelectedOption) {
      setAddAlertVisible(true);
      return;
    }

    setAddSelectedOption("");
    setAddTitle("");
    setAddContent("");
    setAddSource("");
    setAddTags([]);
    setAddTagInput("");
    setAddAlertVisible(false);
    setAddInfoModalOpen(false);
  };

  const handleClickOpen = () => {
    setAddInfoModalOpen(true);
  };

  const handleClose = () => {
    setAddSelectedOption("");
    setAddTitle("");
    setAddContent("");
    setAddSource("");
    setAddTagInput("");
    setAddTags([]);
    setAddInfoModalOpen(false);
  };

  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeContent, setNodeContent] = useState("");
  const [nodeTags, setNodeTags] = useState(null);
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const record = await pb.collection("nodes").getOne(openNode, {
        expand: "infos.author",
      });

      setNodeTitle(record.title);
      setNodeContent(record.content);
      setNodeTags(record.application_areas);

      setInfoList(record.expand.infos);
    }

    fetchData();
  }, [openNode]);

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "80%",
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div style={{ overflowY: "scroll", height: "100%", marginTop: "18px" }}>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "scroll-y",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{ marginBottom: "4px", marginTop: "6px" }}
            >
              {nodeTitle}
            </Typography>
            <Box
              sx={{
                marginBottom: "12px",
                marginTop: "8px",
              }}
            >
              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{ marginRight: "8px" }}
                onClick={likeNode}
              >
                Like
              </Button>
              <Button
                variant="contained"
                size="small"
                color="warning"
                sx={{ marginRight: "8px" }}
                onClick={notrNode}
              >
                Notr
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ marginRight: "8px" }}
                onClick={dislikeNode}
              >
                Dislike
              </Button>
            </Box>

            <Grid container spacing={1}>
              {null != nodeTags &&
                nodeTags.map((tag, index) => (
                  <Grid item key={index}>
                    <Chip label={tag} size="small" />
                  </Grid>
                ))}
            </Grid>

            <Typography component="div" sx={{ marginTop: "20px" }}>
              {nodeContent}
            </Typography>

            {infoList.map((info) => (
              <div key={info.id}>
                <InfoCard
                  info_id={info.id}
                  profile_user_id={user.id}
                  profile_username={user.username}
                  info_content={info.content}
                  info_created={info.created}
                  info_author={info.expand.author.username}
                  info_source={info.source}
                  info_tags={info.tags}
                  info_title={info.title}
                  info_type={info.type}
                />
              </div>
            ))}

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                marginTop: "18px",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ marginBottom: "48px" }}
                onClick={handleClickOpen}
              >
                <AddIcon /> Info Add
              </Button>
            </Box>
            <Dialog open={addInfoModalOpen} onClose={handleClose}>
              <DialogTitle>Add Info</DialogTitle>
              <DialogContent>
                {addAlertVisible && (
                  <Alert severity="error">
                    Do not leave title and content type empty
                  </Alert>
                )}

                <Select
                  variant="outlined"
                  fullWidth
                  label="Select"
                  value={addSelectedOption}
                  onChange={(e) => setAddSelectedOption(e.target.value)}
                  sx={{ margin: "5px" }}
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  sx={{ margin: "5px" }}
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={addContent}
                  onChange={(e) => setAddContent(e.target.value)}
                  sx={{ margin: "5px" }}
                />
                <TextField
                  label="Link"
                  variant="outlined"
                  fullWidth
                  value={addSource}
                  onChange={(e) => setAddSource(e.target.value)}
                  sx={{ margin: "5px" }}
                />

                <TextField
                  label="Tag Ekle"
                  variant="outlined"
                  fullWidth
                  value={addTagInput}
                  sx={{ margin: "5px" }}
                  onChange={handleTagInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleTagAdd();
                    }
                  }}
                />
                <div>
                  {addTags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleTagDelete(tag)}
                      style={{ margin: "4px" }}
                    />
                  ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  İptal
                </Button>
                <Button onClick={handleSave} color="primary">
                  Kaydet
                </Button>
              </DialogActions>
            </Dialog>
          </StyledBox>
        </div>
      </SwipeableDrawer>
    </Root>
  );
}
