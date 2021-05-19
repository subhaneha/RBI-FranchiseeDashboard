import React from 'react'
import "./index.scss"
const HowitWorks=()=>{

    return(
        <div className="root">
            <div>
            <p className="s-success-title">How Does the Success Scorecard work?</p>
            <div>
                <p className="s-success-contentTitle">Restaurant Star Ratings</p>
                <p className="s-success-content"> Every month, each of your restaurants gets a Star Rating out of 5 stars based on their performance measured by 5 scoring metrics. The scoring metrics are grouped by the following categories: Standards, Guest & Teams.</p>
            </div>
            </div>
            <div className="static-containers-colored">
                <img className="static-image" src="../assets/MetricSystem.png"></img>
            </div>
           
            <div className="static-containers-white">
                    <img className="static-image-white" src="../assets/ScoringMetrics1.png"></img>
            </div>
            <div className="static-containers-colored">
                <img className="static-image" src="../assets/ScoringMetrics2.png"></img>
            </div>
             
            
            <div className="static-containers-white">
                <p className="s-small-title">The Star Rating System</p>
                <p className="s-small-content">We roll all your Monthly Restaurant Star Ratings up into an Average Star Rating to calculate your overall stars for a given time period.</p>
            </div>
               
            <div className="static-containers-colored">
                <img className="static-image" src="../assets/RatingSystem.png"></img>
            </div>
            <div className="static-containers-white">
                <p className="s-small-title">The Letter Grade</p>
                <p className="s-small-content">Every 6 months, you are assigned a Letter Grade based on your Average Star Rating across all your restaurants according to the following thresholds in addition to qualitative measurements.</p>
                <img className="static-image-white" src="../assets/LetterGrade.png"></img>
            </div>
            <div className="static-containers-colored">
                <img className="static-image" src="../assets/LetterGradeExample.png"></img>
            </div>

            <div className="static-containers-white">
                <p className="s-small-title">Brand Standards</p>
                <p className="s-small-content">Your Brand Standards Score is based on the percentage of passed checklist items from your last REV visit.</p>
                <img className="static-image-thresholds" src="../assets/StandardThreshold.png"></img>
            </div>

            <div className="static-containers-white">
                <p className="s-small-title">Guest Satisfaction(ACR)</p>
                <p className="s-small-content">Your Guest Satisfaction Score or All Complaints Ratio (ACR) is calculated as the Number of Complaints received over the Number of Tickets, multiplied by 10,000. </p>
                <p className="s-small-content">Tickets are collected across 3 different sources - SMG Surveys, the Contact Center, and Google Reviews. Tickets with 3 Stars or less (Bottom 3s/B3s) are counted towards the Number of Complaints.</p>
                <img className="static-image-thresholds" src="../assets/ACRThreshold.png"></img>
            </div>
            <div className="static-containers-colored">
                <img className="static-image" src="../../assets/Formula.png"></img>
            </div>
            <div className="static-containers-white">
                <p className="s-small-title">Training Module Completion</p>
                <p className="s-small-content">Your Training Module Completion Score is calculated as the percentage of completed modules over incomplete modules. </p>
                <p className="s-small-content"> Training modules count towards your Star Rating starting from 2 weeks after they are assigned to your employees. This gives you time to prepare for their impact on your Score and Star Rating.</p>
                <img className="static-image-thresholds" src="../assets/TrainingModuleThreshold.png"></img>
            </div>

            <div className="static-containers-white">
                <p className="s-small-title">Turnover Rate</p>
                <p className="s-small-content">Your Turnover Rate Score is the percentage of employees leaving your employment every month. </p>
                <img className="static-image-thresholds" src="../assets/TurnoverRateThreshold.png"></img>
            </div>
            <div className="static-containers-white">
                <p className="s-small-title">Average Window Time (SOS)</p>
                <p className="s-small-content">Your Average Window Time or Speed of Service is the average time it takes for a drive through customer to receive their meal from the time they drive up to the takeout window and till they leave.</p>
                <img className="static-image-thresholds" src="../assets/SOSThreshold.png"></img>
            </div>
            <div>
                <p className="s-success-title">Aiming for Success</p>
                <p className="s-small-content">We want you to succeed! </p>
                <p className="s-small-content">The Success Scorecard helps us- and you- measure and track your own performance as well as against our standards benchmarked against your peers.</p>
                <p className="s-small-content">Your Franchisee Letter Grade will be used to …[WIP explain details here]…</p>
                <p className="s-small-content">The Scorecard also allows you to Drill Down to view detailed data on each Key Metric...[WIP explain details here]…</p>
            </div>
            
        </div>
    )
}
export default HowitWorks;