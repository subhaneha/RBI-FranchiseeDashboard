import React, { useRef, useEffect, useState } from 'react';
import "./index.scss"
import { data } from "./grades-data.json"
import Text from '../Charts/Elements/Text';
import useWindowDimensions from '../Charts/Elements/WindowSize';
import axios from 'axios';
const GradingPageBK=()=>{
    const
    { windowWidth } = useWindowDimensions()
    const userDetails:any={}
        useEffect(() => {
            axios({
            method: 'POST',
            // url: '../dashboard2.json'
            url: 'https://zu3hlogvcl.execute-api.us-east-1.amazonaws.com/dev/get-metrics',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
            })
            .then( res => res.data )
            .then( res => {
            const { data } = res.data ;
            console.log(data)
            const dataObj = {
            userDetails: {...userDetails }
            };
           
            })
            },[])
          
  
    return(
        <div className="grading-container">
            
            <div >
           
               
          
                <div className="grades-div">
                {data.map((data)=><div className="grades-map">
                    
                    <div className="grades" style={{backgroundColor:data.gradeColor}}>
                    {data.gradeTitle}
                    </div>
                    <div >
                    <p className="grades-date">{data.gradeStart} -</p>
                    <p className="grades-date">{data.gradeEnd}</p></div>
                    </div>)}
                    <div>
                    <div className="grades-current"></div>
                    <div className="grades-map-current">
                        <p className="grades-current-date">Jul 2021-Dec 2021</p>
                        <p className="grades-current-progress">Grading is in Progress...</p>
                        <p className="grades-current-date">Issue date:Jul 1st 2021</p>
                    </div>
                    </div>

                
                </div>
            </div>
        </div>
    )
}

export default GradingPageBK;