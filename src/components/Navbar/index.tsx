import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import React from "react";
import Menu from "./Menu";
import UserAccountMenu from "./UserAccountMenu";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" className={classes.title}>
            Finance app - Enterprise name
          </Typography>
          <Typography>Saldo R$ 0</Typography>
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
