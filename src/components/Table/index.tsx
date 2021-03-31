import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import "./index.css";

const useStyles = makeStyles({
  table: {
    width:"99%",
    height:"100%"
  },
});

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

const rows = [
  createData(
    "Restaurant #123",
    "31st&5th Ave,NY 00000",
    1.5,
    { current: "16", previous: "8" },
    { current: "81s", previous: "83s" },
    { current: "75%", previous: "83%" },
    { current: "90%", previous: "105%" },
    { current: "73%", previous: "87%" }
  ),
  createData(
    "Restaurant #137",
    "34th&3rd  Ave,NY 00000",
    1.5,
    { current: "11", previous: "5" },
    { current: "73s", previous: "83s" },
    { current: "65%", previous: "45%" },
    { current: "45%", previous: "55%" },
    { current: "79%", previous: "76%" }
  ),
];

const RestaurantTable = () => {
  const classes = useStyles();

  return (
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
            <TableCell className="header guestHead">Avg.Window Time</TableCell>
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
          {rows.map((row) => (
            <TableRow key={row.name} className="tablerow">
              <TableCell component="th" scope="row">
                <Typography className="restaurantName">{row.name}</Typography>
                <Typography className="restaurantPlace">{row.place}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className="currentValue">{row.complaints.current}<img className="indicator" src='../assets/Delta Indicator.svg'></img></Typography>
                <Typography className="previousValue">Previous:{row.complaints.previous}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className="currentValue">{row.windowTime.current} <img className="indicatorDown" src='../assets/Delta Indicator.svg'></img></Typography>
                <Typography className="previousValue">Previous:{row.windowTime.previous}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className="currentValue">{row.trainingRate.current}</Typography>
                <Typography className="previousValue">Previous:{row.trainingRate.previous}</Typography>
              </TableCell>
              <TableCell align="center"><Typography className="currentValue">{row.turnoverRate.current}</Typography>
                <Typography className="previousValue">Previous:{row.turnoverRate.previous}</Typography></TableCell>
              <TableCell align="center"><Typography className="currentValue">{row.standards.current}</Typography>
                <Typography className="previousValue">Previous:{row.standards.previous}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RestaurantTable;
