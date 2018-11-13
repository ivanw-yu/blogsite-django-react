import React, { Component } from 'react';

import BlogRating from './BlogRating';
// import {getRatings} from '../../actions/blogActions';


export default ({ ratings }) => (
  <div className = "ratings-list-area">
    <h1>Ratings</h1>
    { ratings.map( rating => (
        <BlogRating key = {rating.id}
                    rating = {rating}
                    id = {rating.id} />)
      )
    }
  </div>
);
// getBlogRatings action creator is passed to this child component
// class BlogRatings extends Component{
//   constructor(props){
//     super(props);
//     this.state = {page: 1}
//   }
//
//   // componentDidMount(){
//   //   const {blogId: id} = this.props,
//   //         {page} =this.state;
//   //   console.log('blog ratings did mount', id, page)
//   //   this.props.getRatings({blogId: id , page});
//   // }
//
//   render(){
//     return <div> {this.renderRatingsList()} </div>;
//   }
//
//   renderRatingsList(){
//     const {ratings} = this.props;
//     console.log("ratings",ratings, this.props);
//     return ratings && ratings.map( rating => (
//       <BlogRating key = {rating.id}
//                   rating = {rating} />
//     ));
//   }
// }
//
// export default BlogRatings;
// const mapStateToProps = (state) => ({ blogId: state.blog.id,
//                                       ratings: state.blog.ratings })
// export default connect()
