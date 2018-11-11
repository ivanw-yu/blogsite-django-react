import React from 'react';

import RatingStars from './RatingStars';

export default ({ ratingValue, id }) => {
  const yellowBarWidth = ratingValue / 5 * 100;
  return ( <React.Fragment>
              <RatingStars ratingValue = {ratingValue} id={id} />
              {ratingValue}/5
           </React.Fragment>
  );
}
