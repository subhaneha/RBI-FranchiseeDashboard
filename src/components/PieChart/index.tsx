import React, { useEffect, useState } from "react";
import "./index.css"
interface PropsType {
  activate: (color: string) => any;
  deactivate: () => any;
  isHover: boolean;
  color: string;
}
const PieChart = (props: PropsType) => {
  const [cxR, setCxR] = useState("21");
  const [cyR1, setCyR1] = useState("21");
  const [cyR2, setCyR2] = useState("21");
  const [cyD, setCyD] = useState("21");
  const [cXD1, setCXD1] = useState("21");
  const [cXD2, setCXD2] = useState("21");
  const [cxL, setCxL] = useState("21");
  const [cyL, setCyL] = useState("21");
  const rightTransistion = () => {
    setCxR("23");
    setCyR1("19.5");
    setCyR2("20");
  };
  const downTransistion = () => {
    setCyD("23");
    setCXD1("21");
    setCXD2("20.5");
  };
  const defaultState = () => {
    setCxR("21");
    setCyR1("21");
    setCyR2("21");
    setCXD1("21");
    setCXD2("21");
    setCyD("21");
    setCxL("21");
    setCyL("21");
  };
  const leftTransistion=()=>{
    setCxL("19")
    setCyL("20")
  }
  useEffect(() => {
    if (props.isHover) {
      if (props.color == "Guest") rightTransistion();
      else if (props.color == "Team") downTransistion();
      else if (props.color == "Standard") leftTransistion();
    } else {
      defaultState();
    }
  }, [props.isHover]);
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
          onMouseOver={() => props.activate("Guest")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          id="rightCircle"
          className={props.isHover&&props.color=="Guest"?"donutSegmentShadedGuest":""}
          cx={cxR}
          cy={cyR1}
          r="15.91549430918954"
          fill="transparent"
          stroke="#00B2A9"
          stroke-width="3"
          stroke-dasharray="22 78"
          stroke-dashoffset="25"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Guest")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          id="rightCircle"
          className={props.isHover&&props.color=="Guest"?"donutSegmentShadedGuest":""}
          cx={cxR}
          cy={cyR2}
          r="15.91549430918954"
          fill="transparent"
          stroke="#00B2A9"
          stroke-width="3"
          stroke-dasharray="11 89"
          stroke-dashoffset="103"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Team")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          className={props.isHover&&props.color=="Team"?"donutSegmentShadedTeam":""}
          cx={cXD1}
          cy={cyD}
          r="15.91549430918954"
          fill="transparent"
          stroke="#911987"
          stroke-width="3"
          stroke-dasharray="17 83"
          stroke-dashoffset="92"
        ></circle>
        <circle
          onMouseOver={() => props.activate("Team")}
          onMouseOut={() => setTimeout(props.deactivate, 2000)}
          className={props.isHover&&props.color=="Team"?"donutSegmentShadedTeam":""}
          cx={cXD2}
          cy={cyD}
          r="15.91549430918954"
          fill="transparent"
          stroke="#911987"
          stroke-width="3"
          stroke-dasharray="17 83"
          stroke-dashoffset="75"
        ></circle>
        <circle
          className={props.isHover&&props.color=="Standard"?"donutSegmentShadedStandard":""}
          onMouseOver={() => props.activate("Standard")}
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
      <div className={props.isHover&&props.color=="Guest"?`usageHover ${props.color}1`:`usage `}>{props.isHover&&props.color=="Guest"?"22% Guest Satisfaction":<></>}</div>
      <div className={props.isHover&&props.color=="Guest"?`usageHover ${props.color}2`:`usage `}>{props.isHover&&props.color=="Guest"?"11% Speed of Service":<></>}</div>
      <div className={props.isHover&&props.color=="Team"?`usageHover ${props.color}1`:`usage `}>{props.isHover&&props.color=="Team"?"17% Emp Turnover":<></>}</div>
      <div className={props.isHover&&props.color=="Team"?`usageHover ${props.color}2`:`usage `}>{props.isHover&&props.color=="Team"?"17% Training Execution":<></>}</div>
      <div className={props.isHover&&props.color=="Standard"?`usageHover ${props.color}1`:`usage `}>{props.isHover&&props.color=="Standard"?"33% Standards Execution":<></>}</div>
      <div className="chartHeading">D</div>
    </div>
  );
};
export default PieChart;
