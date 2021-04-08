import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {  FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import "./index.css";
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
interface ArlTableType{
  masterData:{
  name: string,
  place: string,
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

const RestaurantTable = () => {
  const classes = useStyles();
  const [isVisible,setIsVisible]=useState("")
  const [rows,setRows]=useState<TableData[]>(row)
  const [arlValue,setArlValue]=useState("")
  const [dmaValue,setDmaValue]=useState("")
  const [sortValue,setSortValue]=useState("")
  useEffect(()=>{
    axios.get("../../assets/TableData.json").then(res=>setRows(res.data)).catch((err)=>{throw(err)})
  },[])
  
  return (
    <div>
      <div className="TableHeadings">
        <div >
          <Typography className="restaurantsList">
            Your Restaurants (53)
          </Typography>
          <Typography className="stats">
            Stats shown are averages calculated over 6 month period
          </Typography>
        </div>
        <div className="rightDivs">
        
          <div className="filter"  >
          <div className="tableUtilHeadings">
            <img src="../../assets/IconFilter.svg" className="filterIcon" alt="filter"></img>
            <Typography>Filter</Typography></div>

            <div className="filterHovered">
          <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">ARL</InputLabel>
        <Select
          native
          value={arlValue}
          onChange={(event)=>{setArlValue(String(event.target.value))}}
          inputProps={{
            name: 'ARL',
            id: 'filled-age-native-simple',
          }}
          className="dropdown"
        >
        <option aria-label="None" value="" />
          <option value={"Alan"}>Alan</option>
          <option value={"Bob"}>Bob</option>
          <option value={"Catherine"}>Catherine</option>
          <option value={"Dana"}>Dana</option>
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">DMA</InputLabel>
        <Select
          native
          value={dmaValue}
          onChange={(event)=>{setDmaValue(String(event.target.value))}}
          inputProps={{
            name: 'ARL',
            id: 'filled-age-native-simple',
          }}
          className="dropdown"
        >
        <option aria-label="None" value="" />
          <option value={"North"}>North</option>
          <option value={"South"}>South</option>
          <option value={"East"}>East</option>
          <option value={"West"}>West</option>
        </Select>
      </FormControl>
          </div>
          </div>
          
         
        
        
          <div className="filter">
            <div className="tableUtilHeadings">
            <img src="../../assets/IconSort.svg" className="filterIcon" alt="filter"></img>
            <Typography>Sort</Typography>
            </div>
           
            <div className="filterHovered">
          <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Sort by</InputLabel>
        <Select
          native
          value={sortValue}
          onChange={(event)=>{setSortValue(String(event.target.value))}}
          inputProps={{
            name: 'Sort',
            id: 'filled-age-native-simple',
          }}
          className="dropdownSort"
        >
          <option value={"Alan"}>Low to High</option>
          <option value={"Bob"}>High to Low</option>
        </Select>
      </FormControl>
          </div>
          
         
        </div>
        <div className="filter">
        <div className="tableUtilHeadings">
            <img src="../../assets/MapView.svg" className="filterIcon" alt="filter"></img>
            <Typography>Map View</Typography></div>
          </div>
        </div>


      </div>
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
