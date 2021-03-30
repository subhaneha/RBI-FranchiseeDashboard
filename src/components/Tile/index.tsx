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

    activate: (color: string) => void
    deactivate: () => void
    isHover: boolean
    color: string
}
const Tile = (props: TileProps) => {
    const tileRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (document) {
            if (props.isHover) {
                const doc = document.getElementById(props.color)
                if (props.color == "Guest") {
                    if (doc) {
                        doc.style.transform = "translate(15px,-10px)"
                        doc.style.boxShadow = "-9px 10px 18px -8px rgba(0, 0, 0, 0.73)"
                    }
                }
                else if (props.color == "Team") {
                    if (doc) {
                        doc.style.transform = "translate(0px, 15px)"
                        doc.style.boxShadow = "-9px 10px 18px -8px rgba(0, 0, 0, 0.73)"
                    }
                }
                else if (props.color == "Standard") {
                    if (doc) {
                        doc.style.transform = "translate(-15px, -10px)"
                        doc.style.boxShadow = "-9px 10px 18px -8px rgba(0, 0, 0, 0.73)"
                    }
                }
            }
            else {
                const doc = document.getElementById(props.header)
                if (doc) {
                    doc.style.transform = "translate(0px,0px)"
                    doc.style.boxShadow = "none"
                }
            }
        }
        
    }, [props.isHover])

return (
    <div ref={tileRef} id={`${props.header}`} onMouseOver={() => props.activate(props.header)} onMouseOut={() => props.deactivate()} className={`tile ${props.header}`}>
        <p className="tileHeading">{props.header}</p>
        <div className="tiles">
            {props.detailsData.map((detail) => <TileDetails {...detail} />)}
        </div>
    </div>
)
}

export default Tile