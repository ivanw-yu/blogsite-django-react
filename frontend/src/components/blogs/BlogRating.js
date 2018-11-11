import React from 'react';

import BlogRatingAuthorHeader from './BlogRatingAuthorHeader';
import BlogRatingComment from './BlogRatingComment';
import RatingStarsBar from './RatingStarsBar';

export default ({rating, id}) => {
  const {user, rating: ratingValue, comment} = rating;
  console.log('BlogRating id', id)
  return ( <React.Fragment>
    <RatingStarsBar ratingValue = {ratingValue} id = {id} />
    <BlogRatingAuthorHeader author = {user} />
    <BlogRatingComment comment = {comment} />
  </React.Fragment> );
};
