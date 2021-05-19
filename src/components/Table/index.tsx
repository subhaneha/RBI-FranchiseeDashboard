import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {  Button, Checkbox, FormControl, FormControlLabel, InputLabel, Select, Typography } from "@material-ui/core";
import "./index.css";
import axios from "axios";
import { ExpandLess } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { data } from "./tableresponse.json"

const useStyles = makeStyles((theme: Theme) =>({
  table: {
    width: "99%",
    height: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
export interface TableData{
  granularity: string,
  fzcode: number,
  fzname: string,
  period: string,
  countrycode: string,
  gmname: string,
  arlname: string,
  doname: string,
  restadress: string,
  acr: string,
  sos: string,
  avgtrainingrate: string,
  turnoverrate:string,
  brandstandards: string,
  overallstarrating: string,
  prevacr: string,
  prevsos: string,
  prevavgtrainingrate: string,
  prevturnoverrate: string,
  prevbrandstandards: string,
  prevoverallstarrating: string,
  restcnt: string
}

interface TableProps{
  rows:TableData[]
}
export const row=[
  {
    granularity: "",
    fzcode: 0,
    fzname: "",
    period: "",
    countrycode: "",
    gmname: "",
    arlname: "",
    doname: "",
    restadress: "",
    acr: "",
    sos: "",
    avgtrainingrate: "",
    turnoverrate:"",
    brandstandards: "",
    overallstarrating: "",
    prevacr: "",
    prevsos: "",
    prevavgtrainingrate: "",
    prevturnoverrate: "",
    prevbrandstandards: "",
    prevoverallstarrating: "",
    restcnt: ""
}]

const RestaurantTable = () => {
  const classes = useStyles();
  const [isVisible,setIsVisible]=useState("")
  const [rows,setRows]=useState<TableData[]>(row)
  const [arlValue,setArlValue]=useState("")
  const [dmaValue,setDmaValue]=useState("")
  const [sortValue,setSortValue]=useState("")
  const [filterValues,setFilterValues]=useState([""])
  const [cancelClicked,setCancelClicked]=useState(true)
  const [utilClicked,setUtilClicked]=useState("")
  const [brandName,setBrandName]=useState("BK")
  useEffect(()=>{
    let arr=Object.values(data)
   let checkArr:TableData[]=row
   arr.map((row)=>checkArr.push(row))
   checkArr.shift()
  setRows(checkArr)
   
  },[])
  const handleCheck=(event:any)=>{
    event.target.checked && filterValues.push(event.target.name)
    if(!event.target.checked){
      const index=filterValues.indexOf(event.target.name)
      index>-1 && filterValues.splice(index,1)
    }
  }
 
  const handleSort=(order:string)=>{
    setSortValue(order)
    if(order==="low") setRows(rows.sort((a,b)=>Number(a.overallstarrating)-Number(b.overallstarrating)))
    else if(order==="high") setRows(rows.sort((a,b)=>Number(b.overallstarrating)-Number(a.overallstarrating)))
    setCancelClicked(true)
  }
  return (
    <div>
       <div className="tableUtils">
      <div className="filtered">
        <div className="filterHeadings"><Typography>Filter By</Typography>
       {!cancelClicked&&utilClicked==="filter"?<ExpandLess onClick={()=>setCancelClicked(true)}/>:<ExpandMoreIcon onClick={()=>{setCancelClicked(false);setUtilClicked("filter")}}/>}
        
        </div>
      <div className={!cancelClicked&&utilClicked==="filter"?"filteredHovered":"filteredHoveredCancel"}>
            <FormControl variant="outlined" className={classes.formControl}>
          <Button className="filterButtons" >DMA:(Designated Market Area)</Button>
          <Button className="filterButtons">North</Button>
          <Button className="filterButtons">South</Button>
          <Button className="filterButtons">East</Button>
          <Button className="filterButtons">West</Button>
</FormControl>

</div>
</div>

<div className="filtered">
        <div className="filterHeadings"><Typography>Sort By</Typography>
       {!cancelClicked&&utilClicked==="sort"?<ExpandLess onClick={()=>setCancelClicked(true)}/>:<ExpandMoreIcon onClick={()=>{setCancelClicked(false);setUtilClicked("sort")}}/>}
        
        </div>
        <div  className={!cancelClicked&&utilClicked==="sort"?"filteredHovered":"filteredHoveredCancel"}>
<FormControl variant="outlined" className={classes.formControl}>
          <Button onClick={()=>handleSort("low")}>Low to High</Button>
          <Button onClick={()=>handleSort("high")}>High to Low</Button>
</FormControl></div>
</div>
</div>


      
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={brandName=="BK"?"header restaurantBK":"header restaurant"}>
                Restaurant Info
              </TableCell>
              <TableCell className={brandName=="BK"?"header guestHeadBK":"header guestHead"}>
                Avg.Complaints Ratio
              </TableCell>
              <TableCell className={brandName=="BK"?"header guestHeadBK":"header guestHead"}>
                Avg.Window Time
              </TableCell>
              <TableCell className={brandName=="BK"?"header teamHeadBK":"header teamHead"}>
                Avg. Training Rate
              </TableCell>
              <TableCell className={brandName=="BK"?"header teamHeadBK":"header teamHead"}>
                Avg. Turnover Rate
              </TableCell>
              <TableCell className={brandName=="BK"?"header standardHeadBK":"header standardHead"}>
                Avg. Brand Standards
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.fzname} className="tablerow">
                <TableCell component="th" scope="row">
                  <Typography className="restaurantName">{row.fzname}</Typography>
                  <Typography className="restaurantPlace">
                    {row.restadress}
                  </Typography>
                  <div className="starsDiv">
                    <div>
                      {Array(Math.floor(Number(row.overallstarrating)))
                        .fill(0)
                        .map((_, index) => (
                          <img
                            alt="star"
                            key={index}
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/Star - medium.svg"
                            }
                            className="star"
                          ></img>
                        ))}
                      {/* {((5-row.stars-Math.floor(5-row.stars))>=0.5)&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
                      {Array(Number(5 - Math.floor(Number(row.overallstarrating))))
                        .fill(0)
                        .map((_, index) => (
                          <img
                          alt="emptystar"
                            key={index}
                            src={
                              process.env.PUBLIC_URL + "/assets/Polygon 1.svg"
                            }
                            className="star"
                          ></img>
                        ))}
                    </div>
                    <Typography className="starsRating">
                      {row.overallstarrating}/5 stars
                    </Typography>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.acr}
                    <img
                    alt="inidcator"
                      className="redIndicatorUp"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.prevacr}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.sos}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.prevsos}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.avgtrainingrate}
                    <img
                      className="redIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.prevavgtrainingrate}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.turnoverrate}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.prevturnoverrate}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.brandstandards}
                    <img
                    alt="indicator"
                      className="redIndicatorDown"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.prevbrandstandards}
                  </Typography>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default RestaurantTable;
