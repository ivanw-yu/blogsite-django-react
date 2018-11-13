import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBlogById,
         getBlogRatings } from '../../actions/blogActions';
import { getRatings,
         resetRatings } from '../../actions/ratingActions';
import BlogDetail from './BlogDetail';
import BlogRatings from './BlogRatings';

import _ from 'lodash';

class BlogView extends Component{

  constructor(props){
    super(props);
    this.state = {
      ratingsPage: 1
    };
  }

  componentDidMount(){
    const {id} = this.props.match.params,
          blogId = id;
    this.props.getBlogById(id);
    this.props.getRatings({blogId: id, page: 1});
    this.setState({blogId: id})
    window.onscroll = _.debounce( () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight){
          this.setState((prevState, props) => ({ratingsPage: prevState.ratingsPage + 1}))
          this.props.getRatings( { page: this.state.ratingsPage,
                                       blogId: this.state.blogId } );
        }
    }, 800).bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    const {ratingsPage} = this.state;
    if( ratingsPage != prevState.ratingsPage ){
      console.log(prevState.ratingsPage, ratingsPage)
      this.setState((prevState, props) => ({ratingsPage}))
    }
  }

  componentWillUnmount(){
    this.props.resetRatings();
  }

  render(){
    const { blog, ratings } = this.props;

    console.log(blog);//, blog.ratings);
    return blog && ratings && (
      <div className = "blog-view-background">
        <BlogDetail blog={blog}
                    author={blog.user} />
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
                         getRatings,
                         resetRatings })( BlogView );
