import React, { useEffect, useRef } from 'react'
import TileDetails from '../TileDetails/index'
import "./index.css"
interface TileProps {
    header: string,
    detailsData: {
        detailHead: string;
        numberValue: string;
        triangle: string;
        rating: string
        previousValue: string;
        stars: number
        tooltiptitle: string;
        tooltipOptions: string[]
    }[]

    activate: (segment:string) => void
    deactivate: (segment:string) => void
    isHover: boolean
    
    segment:string
}
const Tile = (props: TileProps) => {
    const tileRef = useRef<HTMLDivElement | null>(null)
    

return (
    <div>
    <p className={`tileHeading ${props.header}head`}>{props.header}</p>
    <div ref={tileRef}  className={`tile ${props.header}`}>
        
        <div className="tiles">
            {props.detailsData.map((detail) => <TileDetails header={props.header} {...detail}  activate={props.activate} deactivate={props.deactivate}  segment={props.segment} isHover={props.isHover}/>)}
        </div>
    </div>
    </div>
)
}

export default Tile