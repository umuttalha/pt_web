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

import { GraphMap } from "../components/GraphMap";


export default function AddNode() {
  
  return (
    <>
      <PersistentDrawerLeft />

      <GraphMap/>

      
    </>
  );
}
