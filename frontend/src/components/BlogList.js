import React, {Component} from 'react';
import {connect} from 'react-redux';

import { getBlogs } from '../actions';

class BlogList extends Component{

  constructor(props){
    super(props);
    this.state = {
      count: 0,
      blogs: []
    }
  }

  componentWillMount(){
    this.props.getBlogs();
  }

  // set the data received from request as local states,
  // so we don't have to extra data like counts exposed to
  // application-wide redux store.
  componentWillReceiveProps(nextProps){
    console.log("nextPRops", nextProps);
    this.setState({count: nextProps.blogs.blogs.count,
                   blogs: nextProps.blogs.blogs.results})
  }

  render(){
    return this.renderBlogList();
  }

  renderBlogList(){
    const blogs = this.state.blogs;
    console.log("BLOGS", blogs)
    return blogs.map(blog => {
      return (<div> {blog.title}
             {blog.content} </div>);
    });
  }
}

const mapStateToProps = (state) => {
  //**** FOR SOME REASON, THIS IS WHERE WE GET THE WEIRD BLOGS.BLOGS
  console.log("State: ", state);
  return {blogs: state.blogs}
}

export default connect( mapStateToProps,
                        {getBlogs} )(BlogList);
