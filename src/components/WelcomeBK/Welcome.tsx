import React, { useRef, useEffect, useState } from 'react';
import { noData } from '../Landing/landingData.json';
import { Svg } from '../Charts/Elements/SvgElements';
import useWindowDimensions from '../Charts/Elements/WindowSize';
import { Grade, useDivDimensions } from '../Grades/Grade';
import Text from '../Charts/Elements/Text';
import { history } from '../../helpers/history';
import { data } from './textPrompts.json';
import './Welcome.scss';


const WelcomeBK = (props:any) => {
  const [display, setDisplay] = useState(0);
  const
    { windowWidth, windowHeight } = useWindowDimensions(),
    containerHeight = windowHeight / 2
    ;
  useEffect(() => {
    for(let i=1; i <= data.length; i++) {
      ((j) => {
        setTimeout(() => {
          
          if (j === data.length) { setDisplay(0); props.history.replace('/grading') }
          else setDisplay(display => display + 1);
        }, j * 4000);
      })(i);
    }
  },[])
  ;
  const
    componentRef = useRef<HTMLDivElement|null>(null),
    { width, height } = useDivDimensions(componentRef)
    ;
  
  return ( <>
    <div className='extended-text-container'
         ref={ componentRef }
    >
      <Svg
        className='svg background'
        width={ windowWidth }
        height={ height / 2 + 150} >
        <Text className={ 'text header-greeting' }
              height={ 0 }
              width={ windowWidth * .10 }
              offsetX={ display==1?30:10 }
              offsetY={ display==1?50:70}
              textAnchor='left'
              content='Hi, Joe Jolly!'
              split={''}
        />
        <rect x={0} y={450} height={ 150 } width={ width } fill='#FFFFFF'></rect>
        {
          data.map((o,i) => {
            return <Text className={ display === i ? "text header-greeting"  : "text header-greeting not-visible" }
                         height={ 0 }
                         width={ windowWidth * .10 }
                         offsetX={ 10 + (o.offset ? o.offset.x : 0) }
                         offsetY={ 70 + (o.offset ? o.offset.y : 0) }
                         textAnchor='left'
                         content={ o.text }
                         split={''}
            />
          })
        }
        <Text className={ display === 1 ? "text header-greeting"  : "text header-greeting not-visible" }
              height={ 0 }
              width={ windowWidth * .10 }
              offsetX={ 10 + 20 }
              offsetY={ 70 + 50 }
              textAnchor='left'
              content= "Welcome to your Analytics Dashboard."
              split={''}
        />
        <Text className={ display === 3 ? "text header-greeting"  : "text header-greeting not-visible" }
              height={ 0 }
              width={ windowWidth * .10 }
              offsetX={ 10 + 400 }
              offsetY={ 70 + 310 }
              textAnchor='left'
              content= "This is your scorecard timeline."
              split={''}
        />
        <image
          width={ 161 }
          height={ 170 }
          y={ display < 2 ? data[display].image.y : -150 }
          x={ display < 2 ? data[display].image.x : 20 }
          style={{ transition: 'all 1s ease-in-out' }}
          xlinkHref='../../assets/Mask Group 270.svg'
        ></image>
        <image
          width={ 250 }
          height={ 200 }
          y={ display > 1 && display < 4 ? data[display].image.y : 350 }
          x={ display > 1 && display < 4 ? data[display].image.x : 200 }
          style={{ transition: 'all 1s ease-in-out' }}
      xlinkHref={display!=2?"":'../../assets/fryguy2.svg'}
        ></image>
        <image
          width={ 250 }
          height={ 200 }
          y={ display == 3 ? data[display].image.y : 270 }
          x={ display  == 3 ? data[display].image.x : 240 }
          style={{ transition: 'all 1s ease-in-out' }}
          xlinkHref={display!=3?"":'../../assets/fryguy2-fallen.svg'}
        ></image>
        <image
          width={ 300 }
          height={ 300 }
          y={ display == 4 ? data[display].image.y : 450 }
          x={ display == 4 ? data[display].image.x : 1155 }
          style={{ transition: 'all 1s ease-in-out' }}
          xlinkHref={display!=4?"":'../../assets/finger ring.svg'}
        ></image>
        <image
          width={ 400 }
          height={ 400 }
          y={ display == 5 ? data[display].image.y : 450 }
          x={ display == 5 ? data[display].image.x : 1055 }
          style={{ transition: 'all 1s ease-in-out'}}
          xlinkHref={display!=5?"":'../../assets/Cucumber Girl.svg'}
        ></image>
      </Svg>
     <div className="grading-div">
       <div className="grading-circle"></div>
       <div className="grading-content-div">
         <p className="grading-content">Feb 2021</p>
         <p className="grading-content">Your First Grading</p>
         <p className="grading-content"> is in progress..</p>
         <p className="grading-content">Issue date: Jul 1st 2021</p>
       </div>
     </div>
    </div>
    </>
  )
};

export default WelcomeBK;
