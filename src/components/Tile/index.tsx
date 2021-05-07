import { createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import TileDetails from '../TileDetails/index'
import "./index.css"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
interface TileProps {
    header: string,
    detailsData: {
        detailHead: string;
        numberValue: string;
        triangle: string;
        rating: string
        previousValue: string;
        stars: number
        
    }[]

    activate: (segment:string) => void
    deactivate: (segment:string) => void
    isHover: boolean
    
    segment:string
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customWidth: {
      width: "150px",
      backgroundColor: theme.palette.common.white,
      color: 'black',
    }
  }),
);
const tooltips=[
    {
        header:"Guest",
        tooltiptitle:'Average Complaints ratio thresholds:',
        tooltipOptions:["5Star:less than 10","4Star:<=15","3Star:<=20","2Star:<=30","1Star:30+"]
    },
    {
        header:"Guest",
        tooltiptitle:'Average window time thresholds:',
        tooltipOptions:["5Star:<=80sec","4Star:<=95sec","3Star:<=110sec","2Star:<=125sec","1Star:125+sec"]
    },
    {   
        header:"Team",
        tooltiptitle:'The Completion rate for all the role certifications assigned to employees',
        tooltipOptions:["5Star:40%","4Star:30%","3Star:20%","2Star:10%","1Star:below 10%"]
    },
    {
        header:"Standard",
        tooltiptitle:'Brand Standards thresholds:',
        tooltipOptions:["5Star:90%","4Star:80%","3Star:70%","2Star:60%","1Star: <60%"]
    }
]
const Tile = (props: TileProps) => {
    const tileRef = useRef<HTMLDivElement | null>(null)
    const classes=useStyles()
    const toolTip=(Header:string)=>{
        return(
            <div>
               {tooltips.map((tooltip)=> <>{tooltip.header===Header&&<><div className="tooltipHead">{tooltip.tooltiptitle}</div>
                    {tooltip.tooltipOptions.map((option,index)=><div key={index} className="tooltipOptions">{option}</div>)}</>} </>)}
            </div>
        )
    }

return (
    <div>
        <div className="tileHead">
    <p className={`tileHeading ${props.header}head`}>{props.header}</p>
    <Tooltip title={toolTip(props.header)} placement="left-start" className="tooltip" classes={{tooltip:classes.customWidth}}><InfoOutlinedIcon className="infoIcon"/></Tooltip></div>
    <div ref={tileRef}  className={`tile ${props.header}`}>
        
        <div className="tiles">
            {props.detailsData.map((detail) => <TileDetails header={props.header} {...detail}  activate={props.activate} deactivate={props.deactivate}  segment={props.segment} isHover={props.isHover}/>)}
        </div>
    </div>
    </div>
)
}

export default Tile