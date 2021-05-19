import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./index.css";
import RemoveIcon from '@material-ui/icons/Remove';
import axios from "axios";
import { ExpandLess, RotateLeftTwoTone } from "@material-ui/icons";
import { row, TableData } from "../Table";
import { data } from "./tableresponse.json"
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
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    width: "99%",
    height: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
interface TableProps {
  role: string
}



const NestedTable = (props: TableProps) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false)
  const [expandUser, setExpandUser] = useState("")
  const [rows, setRows] = useState<TableData[]>(row)
  const [filteredRows, setFilteredRows] = useState<TableData[]>(row)
  const [sortValue, setSortValue] = useState("")
  const [filterValues, setFilterValues] = useState([""])
  const [cancelClicked, setCancelClicked] = useState(true)
  const [utilClicked, setUtilClicked] = useState("")
  const [brandName, setBrandName] = useState("BK")
  useEffect(() => {


    const userRows = data.filter(userRow => userRow.granularity == props.role.toLocaleUpperCase())

    setRows(userRows)
  }, [props])
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows])
  const handleCheck = (event: any) => {
    event.target.checked && filterValues.push(event.target.name)
    if (!event.target.checked) {
      const index = filterValues.indexOf(event.target.name)
      index > -1 && filterValues.splice(index, 1)
    }
  }
  const handleFilter = () => {
    var filtered = [];

    for (var arr in rows) {
      for (var filter in filterValues) {
        if (rows[arr].fzname == filterValues[filter]) {
          filtered.push(rows[arr]);
        }
      }
    }
    filtered.length > 0 ? setFilteredRows(filtered) : setFilteredRows(rows);

    setCancelClicked(true)
  }
  const handleSort = (order: string) => {
    setSortValue(order)
    if (order === "low") setFilteredRows(rows.sort((a, b) => Number(a.overallstarrating) - Number(b.overallstarrating)))
    else if (order === "high") setFilteredRows(rows.sort((a, b) => Number(b.overallstarrating) - Number(a.overallstarrating)))
    setCancelClicked(true)
  }
  const RowRender = (name: string, role: string) => {
    var userRows = data;
    console.log(name, "funname")
    console.log(role, "role")
    console.log("userroes1", userRows)
    if (role.toLocaleUpperCase() === "DO") userRows = userRows.filter(userRow => userRow.doname.toUpperCase() == name.toUpperCase())
    else if (role.toLocaleUpperCase() == "ARL") userRows = userRows.filter(userRow => userRow.arlname.toLocaleUpperCase() === name.toLocaleUpperCase())
    console.log("userroes2", userRows)
    return (
      userRows.map((row: TableData, index: number) =>
        <TableRow key={index} className="tableRow">

          <TableCell component="th" scope="row">
            <Typography className="restaurantName">{index + 1}.   {row.fzname}</Typography>
            <Typography className="restaurantPlace">
              {row.restcnt}
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
                {/* {((5-row.masterData.stars-Math.floor(5-row.overallstarrating))>=0.5)&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
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
              {row.sos}{" "}
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
              {row.avgtrainingrate}{" "}
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
              {row.turnoverrate}{" "}
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
              {row.brandstandards}{" "}
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
        </TableRow>)
    )
  }


  return (
    <div>
      <div className="tableUtils">
        <div className="filtered">
          <div className="filterHeadings"><Typography>Filter By</Typography>
            {!cancelClicked && utilClicked === "filter" ? <ExpandLess onClick={() => setCancelClicked(true)} /> : <ExpandMoreIcon onClick={() => { setCancelClicked(false); setUtilClicked("filter") }} />}

          </div>
          <div className={!cancelClicked && utilClicked === "filter" ? "filteredHovered" : "filteredHoveredCancel"}>
            <FormControl variant="outlined" className={classes.formControl}>
              {rows.map(filteredRow => <FormControlLabel control={<Checkbox onChange={handleCheck} name={filteredRow.fzname} className="checkBox" ></Checkbox>} label={filteredRow.fzname.split(" ")[0]} />)}

              <div className="filterButtons"> <Button variant='text' onClick={() => setCancelClicked(true)}>Cancel</Button> <Button variant="text" className="applyButton" onClick={handleFilter}>Apply</Button></div>
            </FormControl>

          </div>
        </div>

        <div className="filtered">
          <div className="filterHeadings"><Typography>Sort By</Typography>
            {!cancelClicked && utilClicked === "sort" ? <ExpandLess onClick={() => setCancelClicked(true)} /> : <ExpandMoreIcon onClick={() => { setCancelClicked(false); setUtilClicked("sort") }} />}

          </div>
          <div className={!cancelClicked && utilClicked === "sort" ? "filteredHovered" : "filteredHoveredCancel"}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Button onClick={() => handleSort("low")}>Low to High</Button>
              <Button onClick={() => handleSort("high")}>High to Low</Button>
            </FormControl></div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={brandName == "BK" ? "header restaurantBK" : "header restaurant"}>
                Restaurant Info
              </TableCell>
              <TableCell className={brandName == "BK" ? "header guestHeadBK" : "header guestHead"}>
                Avg.Complaints Ratio
              </TableCell>
              <TableCell className={brandName == "BK" ? "header guestHeadBK" : "header guestHead"}>
                Avg.Window Time
              </TableCell>
              <TableCell className={brandName == "BK" ? "header teamHeadBK" : "header teamHead"}>
                Avg. Training Rate
              </TableCell>
              <TableCell className={brandName == "BK" ? "header teamHeadBK" : "header teamHead"}>
                Avg. Turnover Rate
              </TableCell>
              <TableCell className={brandName == "BK" ? "header standardHeadBK" : "header standardHead"}>
                Avg. Brand Standards
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.map((row) => (
              <>
                <TableRow key={row.fzname} className="tablerow">
                  <TableCell component="th" scope="row">
                    <Typography className="restaurantName">{row.fzname}</Typography>
                    <Typography className="restaurantPlace">
                      {row.restcnt}

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
                        {/* {((5-row.masterData.stars-Math.floor(5-row.masterData.stars))>=0.5)&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
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
                      {row.sos}{" "}
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
                      {row.avgtrainingrate}{" "}
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
                      {row.turnoverrate}{" "}
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
                    <Typography className="currentValueLast">
                      {row.brandstandards}{" "}
                      <img
                        alt="indicator"
                        className="redIndicatorDown"
                        src="../assets/Delta Indicator.svg"
                      ></img>

                      {isVisible && (expandUser == row.fzname) ? <RemoveIcon onClick={() => { setIsVisible(false); setExpandUser("") }} className="AddIcon" /> : <AddIcon onClick={() => { setIsVisible(true); setExpandUser(row.fzname) }} className="AddIcon" />}
                    </Typography>
                    <Typography className="previousValue">
                      Previous:{row.prevbrandstandards}
                    </Typography>
                  </TableCell>
                </TableRow>
                {isVisible && expandUser === row.fzname && row.granularity == "DO" ? RowRender(row.doname, props.role) : null}
                {isVisible && expandUser === row.fzname && row.granularity == "ARL" ? RowRender(row.arlname, props.role) : null}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default NestedTable;
