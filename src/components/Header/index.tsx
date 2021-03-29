import React, { useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames"
import { List, ListItem, Theme, Box, TextField, IconButton } from "@material-ui/core";
import LeftLinks from "../LeftLinks/index";
import Hidden from "@material-ui/core/Hidden";
import { Close, Search } from "@material-ui/icons";
interface Props {}


const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    flexWrap: "wrap",
    display: "flex",
    flexGrow: 1,

    color: "#fff",
  },
  navList: {
    display: "flex",
    flex: "1",
    padding: "0px",
    alignItems: "center",
  },
  rightHeader: {
    flex: ".2",
  },
  scoreCard:{
    flexGrow: 1,
    marginRight: "10px",
    textTransform: "none",
    fontWeight: 600,
    fontSize:"14px",
    color: "#FFFFFF",
  },
  
  leftheader: {
    flex: ".8",
    textAlign: "end",
    [theme.breakpoints.down("xs")]: {
      // zIndex: 3000,
      flex: ".1",
    },
  },
  fixed: {
    position: "fixed",
    // zIndex: 10,
  },
  absolute: {
    position: "absolute",
    // zIndex: 1100,
  },
  appBar: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    // padding: "10px 0px",
    backgroundColor: "#FF7D00",
    [theme.breakpoints.down("sm")]: {
      zIndex: 3000,
    },
  },
  brandLogoOnScroll: {
    // position: "absolute",
    width: "100px",
  },
  inputRoot: {
    color: "#fff",
    height:"45px",
    padding:"0px",
   
  },
  popperBackground: {
    background: "white",
  },
  searchContainer:{
    display:"flex"
  },
  searchIcon:{
    color:"#ffcf3f",
  },
  closeIcon:{
    color:"#ffcf3f",
    marginLeft:"5px",
  },
  iconButton:{
padding:"2px"
  }
}));

const Header: React.FC<Props> = () => {
  const classes = useStyles();
  const [isSearchClick,setIsSearchClick]=useState(false)
  const [value,setValue]=React.useState("")
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.absolute]: true,
    [classes.fixed]: true,
  });


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        // color="inherit"
        position="sticky"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <List className={classes.navList}>
           <ListItem className={classes.rightHeader}>
              <Button >
                <img
                  alt="logo"
                  src="../../assets/Delt Indicator.svg"
                  className={classes.brandLogoOnScroll}
                />
              </Button>
              <Button className={classes.scoreCard} >
                Success Scorecard
              </Button>
            </ListItem>
           <Box className={classes.leftheader}>
            <LeftLinks />
          </Box>
          </List>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
