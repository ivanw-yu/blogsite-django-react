import React from 'react';

import RatingStars from './RatingStars';

export default ({ ratingValue, id }) => {
  const yellowBarWidth = ratingValue / 5 * 100;
  return ( <div style = { { padding: "15px 0 0 0",
                            borderBottom: "1px solid grey",
                            marginLeft: "15px"} }>
              <RatingStars ratingValue = {ratingValue} id={id} />
              {ratingValue}/5
           </div>
  );
}
