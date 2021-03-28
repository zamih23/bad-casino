import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../styles.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
        height: "45px"
    },
    rightPart: {
        display: "flex",
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
    }
  }));

export const Header = () => {
    const classes = useStyle();
    const balance = 0;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
      };

      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

    return(
        <AppBar className={classes.appBar}>
            <Toolbar>
            <div className={classes.appBarContainer}>
            <img src={"logo.svg"} className={classes.logo}/>
            <div className={classes.rightPart}>
            <Typography variant="h4" component="h2">
                $ {balance}
            </Typography>
            <IconButton
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
            </div>
            </div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
              >
                <div style={{width: "200px", height: "75px"}}>
                <span>Enter your name</span>
                </div>
              </Menu>
            </Toolbar>
        </AppBar>
    );
}