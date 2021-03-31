import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  TextField,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "../styles.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fb7042",
  },
  appBarContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "45px",
    height: "45px",
  },
  rightPart: {
    display: "flex",
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginButton: {
    color: "white",
    fontSize: 15,
  },
  loginInput: {
    width: "90%",
    height: "75px",
  },
}));

export const Header = () => {
  const classes = useStyle();
  const balance = useSelector((state) => state.balance);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("")
  const open = Boolean(anchorEl);
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleConfimLogin = () => {
    setIsLogin(true);
    handleClose()
  }

  const handleClickLogOut = () => {
    setIsLogin(false);
    handleClose()
  }

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.appBarContainer}>
          <img src={"logo.svg"} className={classes.logo} />
          <div className={classes.rightPart}>
            <Typography variant="h4" component="h2">
              $ {balance}
            </Typography>
            {isLogin ? (
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
            ) : (
              <Button className={classes.loginButton} onClick={handleMenu}>
                Login
              </Button>
            )}
          </div>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open}
          onClose={handleClose}
        >
          {isLogin ? (
            <div className="loginWindow">
              {console.log(username)}
              <span>Hi, {username} </span>
              <Button onClick={handleClickLogOut}>Log Out</Button>
            </div>
          ) : (
          <div className="loginWindow">
            <span>Hi guess, </span>
            {console.log(username)}
            <TextField
              id="outlined-basic"
              label="Enter your name"
              variant="outlined"
              onChange={handleChange}
              className={classes.loginInput}
            />
            <Button onClick={handleConfimLogin}>Login</Button>
          </div>)}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
