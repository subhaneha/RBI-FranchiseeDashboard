import React , { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { history } from '../../helpers/history';
import { Svg, G } from '../Charts/Elements/SvgElements';
import Circle from '../Charts/Elements/Circle';
import Text from '../Charts/Elements/Text';

export const useDivDimensions = myRef => {

  const
    getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
    }),
    [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    ;
  useEffect( () => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [myRef]);
  return dimensions;
};

export const Grade = ({ i, grade, period, scoreIdentifier, status, issueDate, imageUrl, clickEvent }) => {
  const
    componentRef = useRef(),
    [ resizedWidth, setResizedWidth] = useState(false),
    { width, height } = useDivDimensions(componentRef),
    [ isShown, setIsShown ] = useState(false),
    circleProps = { width, height, isShown },
    handleClick = () => history.push(`/dashboard/:${ scoreIdentifier }`)
    ;
  useEffect( () => {
    setResizedWidth(true);
  })
  ;
  return (
    <div className='grade' ref= { componentRef } style={{gridColumn: `${i + 2} / ${ i + 3 }`}}>
      <Svg width={ width } height={ height }>
        <G
          className='g-scores'
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={ clickEvent }
        > {
          (status === 'complete' ) ?
            <>
            <Circle className={`circle circle-${ grade }`} { ...circleProps }/>
            <Text className='text-grade'
                  width={ width }
                  height={ height }
                  offsetY={ 35 }
                  content={ grade }
                  textAnchor='middle'
            />
            <text className='text-period text-active'
                  x={ width / 2  }
                  y={ height / 2 + 150 }
                  textAnchor={ 'middle' }
            >
              <tspan
                x={ width / 2 }
                dy='0'
                textAnchor={ 'middle' }
              >
                { `${ period.split(' - ')[0] } -` }
              </tspan>
              <tspan
                x={ width / 2 - 10 }
                dy='1em'
                textAnchor={ 'middle' }
              >
                { period.split(' - ')[1] }
              </tspan>
            </text>
            </>
            :
            <>
            <defs>
              <pattern id='image' x='0' y='0' patternUnits='userSpaceOnUse' height='100%' width='100%'>
                <image
                  width={ 100 }
                  height={ 100 }
                  y={ isShown ? (height / 2) - 30  : (height / 2) - 10 }
                  x={ (width / 2) - 55 }
                  style={{ transition: 'y .4s ease-in-out' }}
                  xlinkHref={ require('../../assets/Poppy bag.svg') }
                ></image>
              </pattern>
            </defs>
            <Circle className='circle' id='top' fill='white' { ...circleProps }></Circle>
            <Circle className={ `circle ${ status }` } fill={ imageUrl } { ...circleProps }></Circle>
            <Text className='text-period text-pending'
                  width={ width  }
                  height={ height }
                  offsetY={ 150 }
                  content={ period }
                  textAnchor={ 'middle' }
            />
            <Text className='text-period text-pending'
                  split={ resizedWidth }
                  width={ width }
                  height={ height }
                  offsetY={ 250 }
                  textAnchor='middle'
                  content= { `Issue date: ${ issueDate }` }
            />
            </>
        }
        </G>

        <G>

        </G>
        { ( status !== 'complete') ?
          <Text
            className='text-grade-pending'
            split={ resizedWidth }
            width={ width }
            height={ height }
            offsetY={ 200 }
            textAnchor='middle'
            content='Grading in progress...'
          /> : null
        }
      </Svg>

    </div>
  )
};
