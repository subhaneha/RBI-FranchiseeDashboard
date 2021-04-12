
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import axios from 'axios'
import  React,{useState,useEffect}  from 'react'
import NestedTable from '../../components/NestedTable'
import PieChart from '../../components/PieChart/index'
import RestaurantTable from '../../components/Table/index'
import Tile from '../../components/Tile/index'
import "./index.css"


const backendData={
    username:"Joe",
    timeperiod:"July 2020 to Dec 2020",
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
            stars:3.5,
            tooltiptitle:'The thresholds for grade storing as follows:',
            tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
        }]
     },
     {
        header:"Team",
        detailsData:[{
           detailHead: "Average Training Rate",
           numberValue: "16",
           triangle: "../../assets/Delta indicator.svg",
           rating: "Reduce by 3",
           previousValue: "8",
           stars:2,
           tooltiptitle:'The thresholds for grade storing as follows:',
           tooltipOptions:["A:0.0 to 0.0","B:0.0 to 0.0","C:0.0 to 0.0","D:0.0 to 0.0"]
       },{
           detailHead: "Average Turnover Rate",
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
           detailHead: "Brand Standards",
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

 interface NestedTableType{
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
const Dashboard=()=>{
   const [stars,setStars]=useState(2.1) 
   const [isHover,setIsHover]=useState(false)
   const [viewTable,setViewTable]=useState("restaurants")
   const [segment,setSegment] = useState("")
   const [rowsUpdated,setRowsUpdated]=useState(false)
   const [rows,setRows]=useState<NestedTableType[]>(row)
   const [timePeriod, setTimePeriod] = useState('current');
   const [dropDown, setDropDown] = useState([{name:"Current",value:"current"},{name:"July 2020 to Dec 2020",value:"July 2020 to Dec 2020"},{name:"Jan 2020 to Dec 2020",value:"Jan 2020 to Dec 2020"}]);
   const [data,setData]=React.useState<backend>() //for setting the variable with type
   //setData(backendData)
   useEffect(() => {
   setData(backendData) //this will set state to data variable from backenddata
   axios.get("../../assets/ArlTable.json").then(res=>setRows(res.data)).catch((err)=>{throw(err)})
  
  }, []);
  useEffect(() => {
   console.log("rowsUpdated",rows)
   setRowsUpdated(true)
   }, [rows]);
 
  const activateHover=(segment:string)=>{
   
   setIsHover(true)
   setSegment(segment)
   console.log("segment",segment)
  }
  const deActivateHover=(segment:string)=>{
     console.log("deactivated")
   setIsHover(false)
   setSegment(segment)
  }
   return(
      <div className="root">
         <Typography className="Navigation">Home&gt;July 2020 to Dec 2020</Typography>
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
         <div className="headContent">
         <PieChart activate={activateHover} deactivate={deActivateHover} isHover={isHover} segment={segment}  />
         <div className="tileContainer">
         
         <div className="AverageStars">
             <Typography className="averageText"> Average Star Rating:{stars}/5 stars</Typography>
            <div>
            {Array(Math.floor(stars)).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Star - medium.svg"} className="stars"></img>)}
          
          {Array(5-Number(Math.floor(stars))).fill(0).map((_,index)=><img  key={index} src={process.env.PUBLIC_URL+"/assets/Polygon 1.svg"} className="stars"></img>)}
  
            </div>
        
          </div>
          <div className="tilesGrid">
          {userDetails.map((userDetail,index)=><Tile activate={activateHover} isHover={isHover} segment={segment}  deactivate={deActivateHover} key={index} header={userDetail.header} detailsData={userDetail.detailsData}/>
)}</div>
          </div>
         </div>
         
         <div className="TableHeadings">
        <div >
          <Typography className="restaurantsList">
          {viewTable==="restaurants"?"My Restaurants (4)":""}
          {viewTable==="arl"?"ARL (3)":""}
          {viewTable==="do"?"DO (3)":""}
          </Typography>
          <Typography className="stats">
          {viewTable==="arl"?"ARL (Above Restaurant Leader)":""} {viewTable==="do"?"DO (District Operator)":""} Stats shown are averages calculated over 6 month period
          </Typography>
        </div>
        <div className="rightDivs">
             <Typography className="viewBy">View By</Typography>   
            <Button className={viewTable==="restaurants"?"viewButtonsClicked":"viewButtons"} onClick={()=>setViewTable("restaurants")}>Restaurants</Button>
            <Button className={viewTable==="arl"?"viewButtonsClicked":"viewButtons"}onClick={()=>setViewTable("arl")}>ARL</Button>
            <Button className={viewTable==="do"?"viewButtonsClicked":"viewButtons"}onClick={()=>setViewTable("do")}>DO</Button>
        </div>
        </div>
         
         {viewTable=="restaurants"&&<RestaurantTable {...rows}  />}
         {rowsUpdated&&viewTable!=="restaurants"&&<NestedTable NestedTable={rows} role={viewTable}/>}
      </div>
   )
}

export default Dashboard