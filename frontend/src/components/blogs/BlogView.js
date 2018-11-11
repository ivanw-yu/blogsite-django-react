import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBlogById,
         getBlogRatings } from '../../actions/blogActions';
import { getRatings } from '../../actions/ratingActions';
import BlogDetail from './BlogDetail';
import BlogRatings from './BlogRatings';

class BlogView extends Component{

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getBlogById(id);
    this.props.getRatings({blogId: id, page: 1})
    //this.props.getBlogRatings({id, page: 1})
  }

  render(){
    const { blog, ratings } = this.props;
    console.log(blog);//, blog.ratings);
    return blog && ratings && (
      <div className = "blog-view-background">
        <BlogDetail blog={blog}
                    user={blog.user}/>
        <BlogRatings ratings={ratings} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({ blog: state.blogs.blog,
                                      ratings: state.ratings.ratings });

export default connect(mapStateToProps,
                       { getBlogById,
                         getBlogRatings,
                         getRatings })( BlogView );
