import PersistentDrawerLeft from "../components/NavbarDrawer";

import pb from "../lib/pocketbase";
import { Button } from "@mui/material";
import { useMyContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useMyContext();

  const handleLogout = () => {
    setUser(pb.authStore.clear());
  };

  return (
    <>
      <PersistentDrawerLeft />

      {user ? (
        <Link to="/">
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
