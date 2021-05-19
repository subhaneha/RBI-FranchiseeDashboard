import React from 'react';

const Circle = ({ className, id, isShown, width, height, fill }) => {
  return (
    <circle
      className={ className }
      id={ id }
      cx={ width / 2 }
      cy={ height / 2 }
      r={ isShown ? '85' : '75 '}
      style={{ transition: 'r .4s ease-in-out' }}
      fill={ fill }
    ></circle>
  )
};

export default Circle;