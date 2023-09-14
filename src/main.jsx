import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Map from "./routes/map";
import "./main.css";
import Profile from "./routes/profile";
import Settings from "./routes/settings";
import AddNode from "./routes/addnode";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MyProvider } from "./UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "addnode",
    element: <AddNode />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:username",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
      <RouterProvider router={router} />
    </MyProvider>
  </React.StrictMode>
);