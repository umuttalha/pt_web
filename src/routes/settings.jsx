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
  Alert,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Settings() {
  const { user, setUser } = useMyContext();

  const [username, setUsername] = useState(user.username);
  const [reddit, setReddit] = useState(user.profile_reddit);
  const [twitter, setTwitter] = useState(user.profile_twitter);
  const [facebook, setFacebook] = useState(user.profile_facebook);
  const [pinterest, setPinterest] = useState(user.profile_pinterest);
  const [instagram, setInstagram] = useState(user.profile_instagram);

  const handleLogout = () => {
    setUser(pb.authStore.clear());
  };

  const setProfile = async () => {
    const data = {
      username: username,
      profile_reddit: reddit,
      profile_facebook: facebook,
      profile_twitter: twitter,
      profile_pinterest: pinterest,
      profile_instagram: instagram,
    };

    const record = await pb.collection("users").update(user.id, data);

    console.log(record);
  };

  const handleSave = () => {
    setProfile();
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev); // Toggle the value
  };

  console.log(isChecked)

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
                  checked={isChecked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                </TableCell>
              </TableRow>
              <TableRow>
                {/* <TableCell>Logout</TableCell> */}
                <TableCell>
                  <Link to="/">
                    <Button
                      color="error"
                      variant="contained"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                {/* <TableCell>Save</TableCell> */}
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
