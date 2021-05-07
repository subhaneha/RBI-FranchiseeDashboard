import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {  Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./index.css";
import RemoveIcon from '@material-ui/icons/Remove';
import axios from "axios";
import { ExpandLess } from "@material-ui/icons";
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
export interface NestedTableType{
  masterData:{
  name: string,
  noOfRestaurants: string,
  role:string,
  stars: number,
  complaints: { current: string; previous: string },
  windowTime: { current: string; previous: string },
  trainingRate: { current: string; previous: string },
  turnoverRate: { current: string; previous: string },
  standards: { current: string; previous: string }
},
restaurants:[
  {
    name: string,
    place: string,
    stars: number,
    complaints: { current: string; previous: string },
    windowTime: { current: string; previous: string },
    trainingRate: { current: string; previous: string },
    turnoverRate: { current: string; previous: string },
    standards: { current: string; previous: string }
  }
]
}
interface TableProps{
  NestedTable:NestedTableType[],
  role:string
}
const row:NestedTableType[]=[
{
 masterData: {  
    name:"",
  noOfRestaurants:"",
  stars:0,
  role:"",
  complaints:{ current: "", previous: "" },
  windowTime:{ current: "", previous: "" },
  trainingRate:{ current: "", previous: "" },
  turnoverRate:{ current: "", previous: "" },
  standards:{ current: "", previous: "" }	
},
restaurants:[
    {
        name:"",
      place:"",
      stars:0,
      complaints:{ current: "", previous: "" },
      windowTime:{ current: "", previous: "" },
      trainingRate:{ current: "", previous: "" },
      turnoverRate:{ current: "", previous: "" },
      standards:{ current: "", previous: "" }	
    }
]
}
]


const NestedTable = (props:TableProps) => {
  const classes = useStyles();
  const [isVisible,setIsVisible]=useState(false)
  const [expandUser,setExpandUser]=useState("")
  const [rows,setRows]=useState<NestedTableType[]>(row)
  const [filteredRows,setFilteredRows]=useState<NestedTableType[]>(row)
  const [sortValue,setSortValue]=useState("")
  const [filterValues,setFilterValues]=useState([""])
  const [cancelClicked,setCancelClicked]=useState(true)
  const [utilClicked,setUtilClicked]=useState("")
  const [brandName,setBrandName]=useState("BK")
  useEffect(()=>{
    var userRows=Object.values(props.NestedTable)
  
    userRows=userRows.filter(userRow=>userRow.masterData.role==props.role.toLocaleUpperCase())
    
    setRows(userRows)
  },[props])
  useEffect(()=>{ 
    setFilteredRows(rows);
  },[rows])
  const handleCheck=(event:any)=>{
    event.target.checked && filterValues.push(event.target.name)
    if(!event.target.checked){
      const index=filterValues.indexOf(event.target.name)
      index>-1 && filterValues.splice(index,1)
    }
  }
  const handleFilter=()=>{
    var filtered = [];

for(var arr in rows){
   for(var filter in filterValues){
       if(rows[arr].masterData.name == filterValues[filter]){
          filtered.push(rows[arr]);
         }
   }
}
filtered.length>0?setFilteredRows(filtered):setFilteredRows(rows);

  setCancelClicked(true)
  }
  const handleSort=(order:string)=>{
    setSortValue(order)
    if(order==="low") setFilteredRows(rows.sort((a,b)=>a.masterData.stars-b.masterData.stars))
    else if(order==="high") setFilteredRows(rows.sort((a,b)=>b.masterData.stars-a.masterData.stars))
    setCancelClicked(true)
  }
  const RowRender=(row:any,index:number)=>{
    return(
      <TableRow key={row.name} className="tableRow">
       
                  <TableCell component="th" scope="row">
                    <Typography className="restaurantName">{index+1}.   {row.name}</Typography>
                    <Typography className="restaurantPlace">
                      {row.noOfRestaurants}
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
                        {/* {((5-row.masterData.stars-Math.floor(5-row.masterData.stars))>=0.5)&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
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
    )
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
          {rows.map(filteredRow=><FormControlLabel control={<Checkbox onChange={handleCheck} name={filteredRow.masterData.name} className="checkBox" ></Checkbox>} label={filteredRow.masterData.name.split(" ")[0]} />)}
          
       <div className="filterButtons"> <Button variant='text' onClick={()=>setCancelClicked(true)}>Cancel</Button> <Button variant="text" className="applyButton" onClick={handleFilter}>Apply</Button></div>
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
            {filteredRows?.map((row) => (
                <>
              <TableRow key={row.masterData.name} className="tablerow">
                <TableCell component="th" scope="row">
                  <Typography className="restaurantName">{row.masterData.name}</Typography>
                  <Typography className="restaurantPlace">
                    {row.masterData.noOfRestaurants}
                  </Typography>
                  <div className="starsDiv">
                    <div>
                      {Array(Math.floor(row.masterData.stars))
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
                      {/* {((5-row.masterData.stars-Math.floor(5-row.masterData.stars))>=0.5)&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
                      {Array(Number(5 - Math.floor(row.masterData.stars)))
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
                      {row.masterData.stars}/5 stars
                    </Typography>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.masterData.complaints.current}
                    <img
                    alt="inidcator"
                      className="redIndicatorUp"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.masterData.complaints.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.masterData.windowTime.current}{" "}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.masterData.windowTime.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.masterData.trainingRate.current}{" "}
                    <img
                      className="redIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.masterData.trainingRate.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValue">
                    {row.masterData.turnoverRate.current}{" "}
                    <img
                      className="greenIndicatorDown"
                      alt="indicator"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.masterData.turnoverRate.previous}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="currentValueLast">
                    {row.masterData.standards.current}{" "}
                    <img
                    alt="indicator"
                      className="redIndicatorDown"
                      src="../assets/Delta Indicator.svg"
                    ></img>
                   
                    {isVisible&&(expandUser==row.masterData.name)?<RemoveIcon onClick={()=>{setIsVisible(false);setExpandUser("")}} className="AddIcon" />: <AddIcon onClick={()=>{setIsVisible(true);setExpandUser(row.masterData.name)}} className="AddIcon"/>}
                  </Typography>
                  <Typography className="previousValue">
                    Previous:{row.masterData.standards.previous}
                  </Typography>
                </TableCell>
              </TableRow>
              {isVisible&&expandUser===row.masterData.name?<>
                
                      {row.restaurants.map((restaurant,index)=>RowRender(restaurant,index)
                    )}
                 
              </>:null}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default NestedTable;
