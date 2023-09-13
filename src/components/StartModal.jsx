import React, { useState } from "react";
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
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useMyContext } from "../UserContext";

import pb from "../lib/pocketbase";

function SignInModal({ setModalOpen, isOpen, onClose }) {
  const [value, setValue] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  const { user, setUser } = useMyContext();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(loginEmail, loginPassword)
        .then(() => setUser(pb.authStore.model));
      setModalOpen(false);
      // setIsDrawerOpen(false)
      setLoginPassword("");
      setLoginEmail("");
      setAlertMessage("")
    } catch (err) {
        setAlertMessage(err.data.message)
    }
  };

  const handleSignIn = () => {
    if (signInPassword !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      // setIsDrawerOpen(false)
    }
  };

  const handleGoogleSignIn = () => {
    // Google ile giriş işlemlerini burada gerçekleştirin
  };

  const handleFacebookSignIn = () => {
    // Google ile giriş işlemlerini burada gerçekleştirin
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Sign In" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {
          (alertMessage != "" ? (
            <Alert severity="error">
              {alertMessage}
            </Alert>
          ) : (
            <></>
          ))
        }

        {value === 0 && (
          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              margin="normal"
            />
          </div>
        )}
        {value === 1 && (
          <div>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!passwordsMatch}
              helperText={!passwordsMatch && "Passwords do not match"}
              margin="normal"
            />
          </div>
        )}
        <hr />
        <Button
          onClick={handleGoogleSignIn}
          color="primary"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "4px" }}
        >
          <GoogleIcon sx={{ marginRight: "4px" }} />
          Sign In
        </Button>
        <Button
          onClick={handleFacebookSignIn}
          color="primary"
          variant="outlined"
          fullWidth
        >
          <FacebookIcon sx={{ marginRight: "4px" }} />
          Sign In
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {value === 0 ? (
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        ) : (
          <Button onClick={handleSignIn} color="primary">
            Sign In
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default SignInModal;
