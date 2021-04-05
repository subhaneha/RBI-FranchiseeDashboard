import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  
  ListItem,
  
  Theme,
} from "@material-ui/core";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  titleText: {
    flexGrow: 1,
    textTransform: "none",
    marginRight: "10px",
    fontSize: "15px",
    color: "#fff",
    "&:hover": {
      borderBottom: "1px solid black",
    },
  },
  buttonBordered: {
    display:"flex",
    borderRadius:"50%",
    color: "#ffffff",
   border:"2px solid #ffffff",
  width:"30px",
  height:"30px",
  alignItems:"center",
  justifyContent:"center"
  },
  titleTextUnderline: {
    flexGrow: 1,
    marginRight: "10px",
    textTransform: "none",
    fontWeight: "bold",
    color: "#FFD730",
  },

  navItem: {
    justifyContent: "flex-end",

    [theme.breakpoints.between("xs", "sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "unset",
    },
  },

  menuicon: {
    zIndex: 50000,
  },

  drawerMenu: {
    display: "none",
    "& .MuiDrawer-paper": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      width: "100%",
      // justifyContent: "center",

      paddingTop: "100px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      display: "flex",
    },
  },

  sunGlowbutton: {
    borderRadius: "0px",
    width: "auto",
    backgroundColor: "#FFD730",
    margin: "5px",
    color: "#000",
    "&:hover": {
      backgroundColor: "#F0A500",
    },
  },
  dropdownContent: {
    display: "none",
    position: "absolute",

    background: "#FFD730",
    // right:"0px",
    // left:"-5%",
    // width: "90px",
    // box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    zIndex: 1,
    [theme.breakpoints.between("xs", "sm")]: {
      position: "relative",
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    // textAlign
    "&:hover div": {
      display: "block",
    },
  },
  popovertitleText: {
    flexGrow: 1,
    textTransform: "none",
    marginRight: "10px",
    fontSize: "15px",
    fontWeight: 500,
    textAlign: "left",

    color: "#000",
    "&:hover": {},
  },
  popoverbutton: {
    width: "100%",
  },
  popovertitleTextUnderline: {
    flexGrow: 1,
    marginRight: "10px",
    textTransform: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
}));

const LeftLinks: React.FC<Props> = () => {
  const classes = useStyles();
return(
    <ListItem className={classes.navItem}>

      <Button>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={
              classes.titleText
          }
        >
          Home
        </Typography>
      </Button>
      <Button>
      <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={
              classes.titleText
          }
        >
          How it works
        </Typography>
      </Button>
      <div className={classes.buttonBordered}>
      
          ML
        
      </div>
          </ListItem>

)


    
     
  

 
};

export default LeftLinks;
