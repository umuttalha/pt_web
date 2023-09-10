import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Map from "./routes/map";
import "./main.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "profile/:username",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
