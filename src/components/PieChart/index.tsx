import React, { useEffect, useState } from "react";
import "./index.css"
interface PropsType {
  activate: (segment:string) => any;
  deactivate: (segment:string) => any;
  isHover: boolean;
  segment:string;
}
const PieChart = (props: PropsType) => {
  const [cxR1, setCxR1] = useState("21");
  const [cxR2, setCxR2] = useState("21");
  const [cyR1, setCyR1] = useState("21");
  const [cyR2, setCyR2] = useState("21");
  const [cyD1, setCyD1] = useState("21");
  const [cyD2, setCyD2] = useState("21");
  const [cXD1, setCXD1] = useState("21");
  const [cXD2, setCXD2] = useState("21");
  const [cxL, setCxL] = useState("21");
  const [cyL, setCyL] = useState("21");
  const rightTransistion1 = () => {
    setCxR1("23");
    setCyR1("19.5");
  };
  const rightTransistion2 = () => {
    setCxR2("23");
    setCyR2("20");
  };
  const downTransistion1 = () => {
    setCyD1("23");
    setCXD1("21");
   
  };
  const downTransistion2 = () => {
    setCyD2("23");
    setCXD2("20.5");
  };
  const defaultState = () => {
    setCxR1("21");
    setCxR2("21");
    setCyR1("21");
    setCyR2("21");
    setCXD1("21");
    setCXD2("21");
    setCyD2("21");
    setCyD1("21");
    setCxL("21");
    setCyL("21");
  };
  const leftTransistion=()=>{
    setCxL("19")
    setCyL("20")
  }
  useEffect(() => {
    if (props.isHover) {
      if (props.segment === "Complaints") rightTransistion1();
      else if (props.segment === "Windows") rightTransistion2();
      else if (props.segment === "Training") downTransistion1();
      else if (props.segment === "Turnover") downTransistion2();
      else if (props.segment === "Standards") leftTransistion();
    } else {
      defaultState();
    }
  }, [props.isHover,props.segment]);
  return (
    <div className="pieChart">
      <svg width="350px" height="350px" viewBox="0 0 42 42" className="donut">
        {/* <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle> */}
        <circle
          className="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="transparent"
          stroke-width="3"
        ></circle>

        <circle
          onMouseOver={() => props.activate("Complaints")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          id="rightCircle"
          className={props.isHover&&props.segment==="Complaints"?"donutSegmentShadedGuest":""}
          cx={cxR1}
          cy={cyR1}
          r="15.91549430918954"
          fill="transparent"
          stroke="#00B2A9"
          stroke-width="3"
          stroke-dasharray="22 78"
          stroke-dashoffset="25"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Windows")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          id="rightCircle"
          className={props.isHover&&props.segment==="Windows"?"donutSegmentShadedGuest":""}
          cx={cxR2}
          cy={cyR2}
          r="15.91549430918954"
          fill="transparent"
          stroke="#00B2A9"
          stroke-width="3"
          stroke-dasharray="11 89"
          stroke-dashoffset="103"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Training")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          className={props.isHover&&props.segment==="Training"?"donutSegmentShadedTeam":""}
          cx={cXD1}
          cy={cyD1}
          r="15.91549430918954"
          fill="transparent"
          stroke="#911987"
          stroke-width="3"
          stroke-dasharray="17 83"
          stroke-dashoffset="92"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Turnover")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          className={props.isHover&&props.segment==="Turnover"?"donutSegmentShadedTeam":""}
          cx={cXD2}
          cy={cyD2}
          r="15.91549430918954"
          fill="transparent"
          stroke="#911987"
          stroke-width="3"
          stroke-dasharray="17 83"
          stroke-dashoffset="75"
        ></circle>
        <circle
          className={props.isHover&&props.segment==="Standards"?"donutSegmentShadedStandard":""}
          onMouseOver={() => props.activate("Standards")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          cx={cxL}
          cy={cyL}
          r="15.91549430918954"
          fill="transparent"
          stroke="#D90F06"
          stroke-width="3"
          stroke-dasharray="33 67"
          stroke-dashoffset="58"
        ></circle>
        
      </svg>
      <div className={props.isHover&&props.segment==="Complaints"?`usageHover ${props.segment}`:`usage `}>{props.isHover&&props.segment==="Complaints"?"22% Guest Satisfaction":<></>}</div>
      <div className={props.isHover&&props.segment==="Windows"?`usageHover ${props.segment}`:`usage `}>{props.isHover&&props.segment==="Windows"?"11% Speed of Service":<></>}</div>
      <div className={props.isHover&&props.segment==="Training"?`usageHover ${props.segment}`:`usage `}>{props.isHover&&props.segment==="Training"?"17% Emp Turnover":<></>}</div>
      <div className={props.isHover&&props.segment==="Turnover"?`usageHover ${props.segment}`:`usage `}>{props.isHover&&props.segment==="Turnover"?"17% Training Execution":<></>}</div>
      <div className={props.isHover&&props.segment==="Standards"?`usageHover ${props.segment}`:`usage `}>{props.isHover&&props.segment==="Standards"?"33% Standards Execution":<></>}</div>
      <div className="chartHeading">D</div>
    </div>
  );
};
export default PieChart;
