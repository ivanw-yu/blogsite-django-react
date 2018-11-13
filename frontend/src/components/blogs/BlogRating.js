import React from 'react';

import BlogRatingAuthorHeader from './BlogRatingAuthorHeader';
import BlogRatingComment from './BlogRatingComment';
import RatingStarsBar from './RatingStarsBar';

export default ({rating, id}) => {
  const {user, rating: ratingValue, comment} = rating;
  console.log('BlogRating id', id)
  return ( <div className = "rating-div">
    <div className = "row">
      <div className = "col-any-size">
        <BlogRatingAuthorHeader author = {user} />
      </div>
      <div className = "col-any-size">
        <RatingStarsBar ratingValue = {ratingValue} id = {id} />
        <BlogRatingComment comment = {comment} />
      </div>
    </div>
  </div> );
};
