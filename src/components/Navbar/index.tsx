import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import React, { useContext } from "react";
import Menu from "./Menu";
import UserAccountMenu from "./UserAccountMenu";
import { useKeycloak } from "@react-keycloak/ssr";
import TenantContext from "../TenantProvider";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  title: {
    flexGrow: 1,
  },
});

const NavBar: React.FunctionComponent = () => {
  const { initialized, keycloak } = useKeycloak();
  const tenant = useContext(TenantContext);
  const classes = useStyles();

  return initialized && keycloak?.authenticated && tenant ? (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" className={classes.title}>
            Finance app - {tenant.name}
          </Typography>
          <Typography>Saldo R$ {tenant.balance}</Typography>
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  ) : null;
};

export default NavBar;
