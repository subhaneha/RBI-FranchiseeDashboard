import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import H1 from '../WelcomeBK/H1';
import useWindowDimensions from '../Charts/Elements/WindowSize';
import './Landing.scss';

const Landing = ({ content, children }) => {
  const
    { windowHeight } = useWindowDimensions(),
    containerHeight = windowHeight / 2
    ;
  return (
    <div className='container' style={{ gridTemplateRows: `repeat(2,${ containerHeight  - 90 }px)`}} >
      <div className='splash'>
        <H1 className='header-greeting'
            containerHeight={ containerHeight }
            offset={ 90 }
            content={ content }
        />
      </div>
      <div className='white-space'></div>
      { children }
    </div>
  );
};

export default Landing;
