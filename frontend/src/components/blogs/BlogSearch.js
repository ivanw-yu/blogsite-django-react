import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlogList from './BlogList';
import Pagination from '../commons/Pagination';
import SearchHeader from '../commons/SearchHeader';

import { getBlogs } from '../../actions/blogActions';

/*
  BlogSearch is dependent on the SearchBar component,
  which updates the redux blogs state based on search keywords.
*/
class BlogSearch extends Component{
  constructor(){
    super();
    this.state = { noInitialResults: false}
  }

  componentDidUpdate(prevProps){
    console.log("prevProps: ", prevProps)
    const {blogs} = this.props;

    // if the initial results has no blogs, get all the blogs instead,
    // and set the noInitialResults state to true. By setting it to true,
    // this ensures that any subsequent request for blogs does not happen due to
    // the count being 0.
    if(blogs && blogs.count === 0 && !this.state.noInitialResults){
      console.log("REQUEST AGAIN");
      this.props.getBlogs({page: 1});
      this.setState({noInitialResults: true});
    }
  }
  // the acquired set of blogs is in the results property of blogs prop
  render(){
    console.log("this.props.blogs in BlogSearch", this.props.blogs);
    const {blogs} = this.props;
    return blogs && (
      <React.Fragment>
        <SearchHeader page = {blogs.page}
                      count = {blogs.count}
                      searchTerm = {blogs.searchTerm}
                      type = "blogs"
                      noInitialResults = {this.state.noInitialResults}
        />
        <BlogList blogs={blogs.results} />
        <Pagination page = {blogs.page}
                        count = {blogs.count}
                        next = {blogs.next}
                        prev = {blogs.prev}
                        type = "blogs" />
      </React.Fragment>
    )
  }
}

// <p>
//   { this.state.noInitialResults &&
//       `No results found for
//           search term '${blogs.searchTerm}',
//           here are some blogs.` }
//   {`Showing ${ blogs.page * 9 - 8 +'-'+ Math.min(blogs.page * 9, blogs.count)} blogs of ${blogs.count} blogs.`}
// </p>

const mapStateToProps = (state) => ({blogs: state.blogs.blogs});
export default withRouter(connect(mapStateToProps, {getBlogs})(BlogSearch));
