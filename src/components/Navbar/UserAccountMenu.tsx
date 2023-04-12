import * as React from "react";
import { IconButton, Menu, Divider, MenuItem } from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

const UserAccountMenu = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleOpen} edge="end">
        <AccountBox />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        getContentAnchorEl={null}
      >
        <MenuItem disabled={true}>
          {(keycloak?.idTokenParsed as any)?.name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push("/logout")}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserAccountMenu;
