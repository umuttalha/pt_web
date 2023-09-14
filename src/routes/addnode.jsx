import PersistentDrawerLeft from "../components/NavbarDrawer";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AddNode() {
  // State kullanarak ad ve soyadı takip ediyoruz
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  // Form verileri değiştikçe state'i güncelliyoruz
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submit işlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    setOpen(true);
    console.log("Gönderilen Veriler:", formData);

    setFormData({
      firstName: "",
      lastName: "",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <PersistentDrawerLeft />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Which topic do you want to add?
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="firstName">Topic</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel htmlFor="lastName" sx={{marginTop:1}}>
            Subtopic Examples(not required)
          </InputLabel>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            Send
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Request received"
          action={action}
        />
      </Container>
    </>
  );
}
