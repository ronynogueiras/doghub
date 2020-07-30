import React, { useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StoreIcon from "@material-ui/icons/Store";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Badge from "@material-ui/core/Badge";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
  },
  adoptionIcon: { 
    color: "#fff" 
  },
  dog: {
    fontWeight: "400"
  },
  hub: {
    fontWeight: "900"
  },
  containerSpace: { 
    marginTop: theme.spacing(6), 
  },
  spaceBackButton: {
    display: "block",
    width: 64
  },
}));

const Layout = ({ children }) => {
  const location = useLocation();
  const { adoptions } = useSelector((state) => state.adoptions);
  const classes = useStyles();

  useEffect(() => {}, [adoptions.length]);

  const BackButton = () => {
    if (location.pathname === "/") {
      return (
        <>
          <span className={classes.spaceBackButton}></span>
        </>
      );
    }
    return (
      <Button color="inherit" onClick={(e) => history.goBack()}>
        <ArrowBackIcon />
      </Button>
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <BackButton />
          <Link to="/" className={classes.adoptionIcon}>
            <Typography variant="h6">
              <span className={classes.dog}>DOG</span>
              <span className={classes.hub}>HUB</span>
            </Typography>
          </Link>
          <Link to="/lista-adocao" className={classes.adoptionIcon}>
            <Button color="inherit">
              <Badge badgeContent={adoptions.length} color="error">
                <StoreIcon />
              </Badge>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.containerSpace}>{children}</div>
    </>
  );
};
export default memo(Layout);
