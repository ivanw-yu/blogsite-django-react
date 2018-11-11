import React from 'react';

export default ({id,value, ratingValue}) => {
  const points = `10,${value + 2} 4,${value + 16} 18,${value + 7} 2,${value + 7} 16,${value + 16}`,
        partialFilledStarNum = Math.floor(ratingValue);

  let fillPercentage;
  if(partialFilledStarNum === value && partialFilledStarNum !== ratingValue){
    fillPercentage = ratingValue - value;
  }else if(ratingValue < value){
    fillPercentage = 0;
  }else{
    fillPercentage = 1;
  }

  const fill = fillPercentage * 20;
  const fillPercentageGradientId = `fill-percentage-id${id}-value${value}`;

  return ( <svg height="20" width="20">
            <defs>
              <linearGradient id={fillPercentageGradientId}>
                <stop stopOpacity="1" offset={fillPercentage *100 + "%"} stopColor="yellow"></stop>
                <stop stopOpacity="0" offset={(1-fillPercentage) *100 + "%"} stopColor="grey" ></stop>
              </linearGradient>
            </defs>
      <polygon points="10,2 4,16 18,7 2,7 16,16 "
        style={ { fill: `url(#${fillPercentageGradientId})`,
                  strokeWidth:1,
                  fillRule: 'nonzero'} } />
  </svg> )
}
