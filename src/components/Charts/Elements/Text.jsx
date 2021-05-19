import React, { useState, useEffect } from 'react';
import { select } from 'd3';

const Text = ({ className, width, height, offsetY, offsetX, content, split, textAnchor }) => {
  const
    [textLength, setTextLength] = useState(false),
    splitTextMatch = content.match(/^(\S+)[:|\s](.*)/)
    ;
  useEffect( () => {
    const textPixels = select(`.${ className.replace(/\s/g, '.') }`).node().getComputedTextLength();

    if (textPixels > width && split) {
      setTextLength(true);
    }
  });

  {
    return textLength && split ?
      <text
        className={ className }
        x={ width / 2 + (offsetX ? offsetX : 0) }
        y={ height / 2 + offsetY }
        textAnchor={ 'middle' }
      >
        <tspan
          x={ width / 2 }
          dy='0'
          textAnchor={ 'middle' }
        >
          { `${ splitTextMatch[1] }` }
        </tspan>
        <tspan
          x={ width / 2 - 10 }
          dy='1em'
          textAnchor={ 'middle' }
        >
          { splitTextMatch[2] }
        </tspan>
      </text> : <text
      className={ className }
      x={ width / 2  + (offsetX ? offsetX : 0) }
      y={ height / 2 + offsetY }
      textAnchor={ textAnchor }
    >
      { content }
    </text>
  }



};

export default Text;
