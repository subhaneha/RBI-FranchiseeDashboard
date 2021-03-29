
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import  React,{useState,useEffect}  from 'react'
import PieChart from '../../components/PieChart/index'
import Tile from '../../components/Tile/index'
import "./index.css"


const backendData={
    username:"Joe",
    timeperiod:"july 2020 to Dec 2020",
    stars:2.5
 }
  type backend={
    username:String,
    timeperiod:String,
    stars:Number
 }
 const userDetails=[
     {
         header:"Guest",
         detailsData:[{
            detailHead: "Average Complaints Ratio",
            numberValue: "16",
            triangle: "../../assets/Delta indicator.svg",
            rating: "Reduce by 3",
            previousValue: "8",
            stars:2,
            tooltiptitle:'The thresholds for grade storing as follows:',
            tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
        },{
            detailHead: "Average Windows Time",
            numberValue: "70s",
            triangle: "../../assets/Delta indicator.svg",
            rating: "Reduce by 5s",
            previousValue: "83s",
            stars:3,
            tooltiptitle:'The thresholds for grade storing as follows:',
            tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
        }]
     },
     {
        header:"Team",
        detailsData:[{
           detailHead: "Average Complaints Ratio",
           numberValue: "16",
           triangle: "../../assets/Delta indicator.svg",
           rating: "Reduce by 3",
           previousValue: "8",
           stars:2,
           tooltiptitle:'The thresholds for grade storing as follows:',
           tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
       },{
           detailHead: "Average Windows Time",
           numberValue: "70s",
           triangle: "../../assets/Delta indicator.svg",
           rating: "Reduce by 5s",
           previousValue: "83s",
           stars:3,
           tooltiptitle:'The thresholds for grade storing as follows:',
           tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
       }]
    },
    {
        header:"Standard",
        detailsData:[{
           detailHead: "Average Complaints Ratio",
           numberValue: "15",
           triangle: "../../assets/Delta indicator.svg",
           rating: "Reduce by 5",
           previousValue: "8",
           stars:2,
           tooltiptitle:'The thresholds for grade storing as follows:',
           tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
        }
       ]
    }
 ]

const Dashboard=()=>{
   const [stars,setStars]=useState(2.1) 
   const [timePeriod, setTimePeriod] = useState('current');
   const [dropDown, setDropDown] = useState([{name:"Current",value:"current"},{name:"July 2020 to Dec 2020",value:"July 2020 to Dec 2020"},{name:"Jan 2020 to Dec 2020",value:"Jan 2020 to Dec 2020"}]);
   const [data,setData]=React.useState<backend>() //for setting the variable with type
   //setData(backendData)
   useEffect(() => {
   setData(backendData) //this will set state to data variable from backenddata
  }, []);
   return(
      <div className="root">
         <div className="maindiv">
         <div className="Heading">Hi {data?.username} Here's your Scorecard for {data?.timeperiod}</div>
         <Box className="timePeriodDropDown">
          <FormControl className="formControl">
            <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
              Time Period:
            </InputLabel>
            <Select
              labelId='demo-simple-select-placeholder-label-label'
              id='demo-simple-select-placeholder-label'
              value={timePeriod}
              onChange={(event) => setTimePeriod(String(event.target?.value))}
              displayEmpty
              className="selectEmpty"
            >
              {dropDown.map(({ value, name }, index) => (
                <MenuItem key={index} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

         </div>
         
          <div className="AverageStars">
             <Typography className="averageText"> Average Star Rating:{stars}/5 stars</Typography>
            <div>
            {Array(Math.floor(stars)).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Star - medium.svg"} className="star"></img>)}
          
          {Array(5-Number(Math.floor(stars))).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Polygon 1.svg"} className="star"></img>)}
  
            </div>
        
          </div>
         <div className="tileContainer">
         <PieChart/>
            {userDetails.map((userDetail,index)=><Tile key={index} header={userDetail.header} detailsData={userDetail.detailsData}/>
)}</div>
      </div>
   )
}

export default Dashboard