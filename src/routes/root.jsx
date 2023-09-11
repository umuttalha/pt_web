import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SwipeableEdgeDrawer from "../components/InfoDrawer";
import PersistentDrawerLeft from "../components/NavbarDrawer";

export default function Root() {
  return (
    <>
      <PersistentDrawerLeft />
      <SwipeableEdgeDrawer />
    </>
  );
}
