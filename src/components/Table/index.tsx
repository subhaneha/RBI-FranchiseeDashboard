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
import { NestedTableType } from "../NestedTable";
import { ExpandLess } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function createData(
  name: string,
  place: string,
  stars: number,
  complaints: { current: string; previous: string },
  windowTime: { current: string; previous: string },
  trainingRate: { current: string; previous: string },
  turnoverRate: { current: string; previous: string },
  standards: { current: string; previous: string }
) {
  return {
    name,
    place,
    stars,
    complaints,
    windowTime,
    trainingRate,
    turnoverRate,
    standards,
  };
}
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
interface TableData{
  name: string,
  place: string,
  stars: number,
  complaints: { current: string; previous: string },
  windowTime: { current: string; previous: string },
  trainingRate: { current: string; previous: string },
  turnoverRate: { current: string; previous: string },
  standards: { current: string; previous: string }
}

interface TableProps{
  rows:NestedTableType[]
}
const row=[
  {
    name:"",
  place:"",
  stars:0,
  complaints:{ current: "", previous: "" },
  windowTime:{ current: "", previous: "" },
  trainingRate:{ current: "", previous: "" },
  turnoverRate:{ current: "", previous: "" },
  standards:{ current: "", previous: "" }	
}]

const RestaurantTable = (props:TableProps) => {
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
   
    
    const tempRows:TableData[]=row
    props.rows.forEach(row=>{row.restaurants.forEach(restaurant=>tempRows.push(restaurant))})
    tempRows.shift()
    setRows(tempRows)
  },[props.rows])
  const handleCheck=(event:any)=>{
    event.target.checked && filterValues.push(event.target.name)
    if(!event.target.checked){
      const index=filterValues.indexOf(event.target.name)
      index>-1 && filterValues.splice(index,1)
    }
  }
 
  const handleSort=(order:string)=>{
    setSortValue(order)
    if(order==="low") setRows(rows.sort((a,b)=>a.stars-b.stars))
    else if(order==="high") setRows(rows.sort((a,b)=>b.stars-a.stars))
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
              <TableRow key={row.name} className="tablerow">
                <TableCell component="th" scope="row">
                  <Typography className="restaurantName">{row.name}</Typography>
                  <Typography className="restaurantPlace">
                    {row.place}
                  </Typography>
                  <div className="starsDiv">
                    <div>
                      {Array(Math.floor(row.stars))
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
                      {Array(Number(5 - Math.floor(row.stars)))
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
                      {row.stars}/5 stars
                    </Typography>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.complaints.current}
                    <img
                    alt="inidcator"
                      className="redIndicatorUp"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.complaints.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.windowTime.current}{" "}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.windowTime.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.trainingRate.current}{" "}
                    <img
                      className="redIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.trainingRate.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.turnoverRate.current}{" "}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.turnoverRate.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.standards.current}{" "}
                    <img
                    alt="indicator"
                      className="redIndicatorDown"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.standards.previous}
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
