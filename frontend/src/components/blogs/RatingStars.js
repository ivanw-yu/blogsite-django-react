import React from 'react';

import RatingStar from './RatingStar';

export default ({ ratingValue, id }) => {

  return [1,2,3,4,5].map( value => {
    return <RatingStar ratingValue = {ratingValue}
                       value={value}
                       key = {value}
                        id = {id} />;
  });
}
