import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import {  Theme,makeStyles,createStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import "./index.css"
interface DetailProps {
  header:string;
  detailHead: string;
  numberValue: string;
  triangle: string;
  rating: string
  previousValue: string;
  stars:number
  tooltiptitle:string;
  tooltipOptions:string[];
  activate: (segment:string) => void
  deactivate: (segment:string) => void
  isHover:boolean;
  
  segment:string;
}
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customWidth: {
      width: "150px",
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
    }
  }),
);
const TileDetails = (props: DetailProps) => {
    const classes=useStyles()
    const [halfStar,setHalfStar]=useState(false)
    const [remStars,setRemStars]=useState(5-Math.floor(props.stars))
    
    const toolTip=()=>{
        return(
            <div>
                <div>{props.tooltiptitle}</div>
                    {props.tooltipOptions.map((option,index)=><div key={index}>{option}</div>)}
            </div>
        )
    }
    // useEffect(()=>{
    //   // if(props){
    //   //   if((5-props.stars-Math.floor(5-props.stars))>=0.5){
    //   //     setHalfStar(true)
    //   //     setRemStars(remStars-1)
    //   //   }
    //   // }
    //   console.log("headerTile",props.header)
    // },[])
    
    useEffect(() => {
      if (document) {
        
          if (props.isHover) {
            
              const doc = document.getElementById(props.segment)
              console.log("propSegment",props.segment)
              if (doc) {
                doc.style.transform = "scale(1.05,1.1)"
                doc.style.boxShadow = "-9px 10px 18px -8px rgba(0, 0, 0, 0.73)"
            }
            
          
          }
          else {
              const doc = document.getElementById(props.segment)
              
              if (doc) {
                  doc.style.transform = "scale(1)"
                  doc.style.boxShadow = "none"
              }
          }
      }
      
  }, [props.isHover])
  return (
    <div className={`tileDetails ${props.header}Tile`} id={`${props.detailHead.split(" ")[1]}`} onMouseOver={()=>props.activate(props.detailHead.split(" ")[1])} onMouseLeave={()=>props.deactivate(props.detailHead.split(" ")[1])}>
       <Tooltip title={toolTip()} placement="left-start" className="tooltip" classes={{tooltip:classes.customWidth}}><InfoOutlinedIcon className="infoIcon"/></Tooltip>
      <Typography className="tileObjectHeading">{props.detailHead}</Typography>
      
      <div className="valueIndicator">
        <Typography className="numbers">{props.numberValue}</Typography>
        {/* <img src={props.triangle} className="indicator" ></img> */}
        <div className="arrow-up"></div>
      </div>
      <Typography className="previous">Previous:{props.previousValue}</Typography>
      <div className="starsRating">
          {Array(Math.floor(props.stars)).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Star - medium.svg"} className="star"></img>)}
          {/* {halfStar&&<img  src={process.env.PUBLIC_URL+"/assets/star-half-yellow.svg"} className="halfstar"></img>} */}
          {Array(Number(Math.floor(remStars))).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Polygon 1.svg"} className="star"></img>)}
      </div>
      <Typography className="nextStar">Next Star:{props.rating}</Typography>
    </div>
  );
};

export default TileDetails;
