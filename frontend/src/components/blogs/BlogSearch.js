import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlogList from './BlogList';


/*
  BlogSearch is dependent on the SearchBar component,
  which updates the redux blogs state based on search keywords.
*/
class BlogSearch extends Component{

  // the acquired set of blogs is in the results property of blogs prop
  render(){
    console.log("this.props.blogs in BlogSearch", this.props.blogs);
    return this.props.blogs && (
      <BlogList blogs={this.props.blogs.results} />
    )
  }
}

const mapStateToProps = (state) => ({blogs: state.blogs.blogs});
export default withRouter(connect(mapStateToProps)(BlogSearch));
