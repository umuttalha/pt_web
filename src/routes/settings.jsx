import React, { useState } from "react";
import PersistentDrawerLeft from "../components/NavbarDrawer";
import pb from "../lib/pocketbase";
import { useMyContext } from "../UserContext";
import { Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  Switch,
  Divider,
} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Settings() {
  const { user, setUser } = useMyContext();

  const handleLogout = () => {
    setUser(pb.authStore.clear());
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <PersistentDrawerLeft />

      {/* <Container maxWidth="sm">
        <Link to="/">
          <Button color="error" onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </Link>

        <br/>
        Gizli profil
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Container> */}

<Container maxWidth="sm">
      <TableContainer>
        <Table>
          {/* <TableHead>
            <TableRow>
              <TableCell>Ayar</TableCell>
              <TableCell>Değer</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            
            <TableRow>
              <TableCell>Private profile</TableCell>
              <TableCell>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Logout</TableCell>
              <TableCell>
                <Link to="/">
                  <Button color="error" variant="contained" onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
}
