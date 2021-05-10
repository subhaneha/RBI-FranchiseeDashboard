import { createStyles, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import "./index.css"

export interface AlertProps{
    alertType: string,
    actionable: boolean
}


const Alert = (props:AlertProps) => {
   

const [closed,setClosed]=useState(false)

useEffect(()=>{
   if(!props.actionable) setInterval(()=>{setClosed(true)},5000)
   else setClosed(false)
},[props])

return (
    <div>
    {!closed?
    <div className={`alertDiv ${props.alertType}`}>

        <Typography className="alertMessage"><span className="alertType"> {props.alertType} </span>Training certification decreased by 7% this month due to only 60% completion of the batter fry module</Typography>
        {props.actionable?<CloseIcon onClick={()=>setClosed(true)}/>:""}
    </div>:<></>}
    </div>
)
}

export default Alert