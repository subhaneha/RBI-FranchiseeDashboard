import React from 'react';

const H1 = ({ className, containerHeight, content, offset}) => {
  console.log(offset)
  return (
    <h1
      className={ className }
      style={{ marginTop: (containerHeight / 3) - offset  }}
    >
      { content }
    </h1>

  )
};

export default H1;