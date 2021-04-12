import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {  FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "./index.css";
import RemoveIcon from '@material-ui/icons/Remove';
import axios from "axios";
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
  const [filterValue,setFilterValue]=useState("")
  useEffect(()=>{
    var userRows=Object.values(props.NestedTable)
  
    userRows=userRows.filter(userRow=>userRow.masterData.role==props.role.toLocaleUpperCase())
    
    setRows(userRows)
  },[props])
  useEffect(()=>{ 
    setFilteredRows(rows);
  },[rows])
  const handleFilter=(value:string)=>{
    if(value=="clear") {setFilteredRows(rows);setFilterValue("")}
  else{
    setFilterValue(value)
  
  setFilteredRows(rows.filter(row=>row.masterData.name.split(" ")[0]==value)  )}
  
  }
  const handleSort=(order:string)=>{
    setSortValue(order)
    if(order==="low") setFilteredRows(rows.sort((a,b)=>a.masterData.stars-b.masterData.stars))
    else if(order==="high") setFilteredRows(rows.sort((a,b)=>b.masterData.stars-a.masterData.stars))
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
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Filter By</InputLabel>
        <Select
        
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filterValue}
          onChange={(event)=>handleFilter(String(event.target.value))}
          label="Age"
        >
          
          {rows.map(filteredRow=><MenuItem value={filteredRow.masterData.name.split(" ")[0]}>{filteredRow.masterData.name}</MenuItem>)}
          <MenuItem value={"clear"}>clear filter</MenuItem>
        </Select>
</FormControl>

<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
        <Select
        
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sortValue}
          onChange={(event)=>handleSort(String(event.target.value))}
          label="Age"
        >
          <MenuItem value={"low"}>Low to High</MenuItem>
          <MenuItem value={"high"}>High to Low</MenuItem>
        </Select>
</FormControl>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="header restaurant">
                Restaurant Number
              </TableCell>
              <TableCell className="header guestHead">
                Avg.Complaints Ratio
              </TableCell>
              <TableCell className="header guestHead">
                Avg.Window Time
              </TableCell>
              <TableCell className="header teamHead">
                Avg. Training Rate
              </TableCell>
              <TableCell className="header teamHead">
                Avg. Turnover Rate
              </TableCell>
              <TableCell className="header standardHead">
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
