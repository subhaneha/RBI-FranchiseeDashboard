import React from 'react';

export const G = props => {
  const { className, width, height, children, onMouseEnter, onMouseLeave, onClick } = props;
  return (
    <g
      className={ className }
      width={ width }
      height={ height }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      onClick={ onClick }

    >
      { children }
    </g>
  )
};

export const Svg = props => {
  const { className, width, height, children, fill } = props;
  return (
    <svg
      className={ className }
      width={ width }
      height={ height }
      fill={ fill }
    >
      { children }
    </svg>
  )
};
