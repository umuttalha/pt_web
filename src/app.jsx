import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Map from "./routes/map";
import Profile from "./routes/profile";
import Settings from "./routes/settings";
import AddNode from "./routes/addnode";
import { useMyContext } from "./UserContext";
import Home from "./routes/home";
import { ThemeProvider, CssBaseline} from "@mui/material";

function App() {
  const { user, theme } = useMyContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Root />} />
          )}
          {/* <Route path="/" element={<Root />} />
          <Route path="home" element={<Home />} /> */}
          <Route path="map" element={user ? <Map /> : <Navigate to="/" />} />
          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="settings"
            element={user ? <Settings /> : <Navigate to="/" />}
          />
          <Route
            path="addnode"
            element={user ? <AddNode /> : <Navigate to="/" />}
          />
          <Route path=":username" element={<Profile />} />
          {/* <Route path="login" element={<UserAuthentication />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
