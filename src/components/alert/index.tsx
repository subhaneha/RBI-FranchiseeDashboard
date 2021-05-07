import { createStyles, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import "./index.css"
const Alert = () => {
   
const [alertType,setAlertType]=useState("Warning")
const [closed,setClosed]=useState(false)
const [alertSvg,setAlertSvg]=useState("")

useEffect(()=>{
    // setInterval(()=>{setClosed(true)},5000)
    if(alertType==="Warning") setAlertSvg("../assets/Warning alert.svg")
    else if(alertType=="Neutral") setAlertSvg("../assets/Neutral alert.svg")
    else if(alertType=="Success") setAlertSvg("../assets/Success alert.svg")

},[])
return (
    <div>
    {!closed?
    <div className={`alertDiv ${alertType}`}>

        <Typography className="alertMessage"><img src={alertSvg}/><span className="alertType"> {alertType} </span>Training certification decreased by 7% this month due to only 60% completion of the batter fry module</Typography>
        <CloseIcon onClick={()=>setClosed(true)}/>
    </div>:<></>}
    </div>
)
}

export default Alert