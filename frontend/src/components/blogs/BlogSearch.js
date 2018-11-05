import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlogList from './BlogList';
import Pagination from '../commons/Pagination';
import SearchHeader from '../commons/SearchHeader';

import { getBlogs } from '../../actions/blogActions';
import getQueryParamValue from '../../utils/getQueryParamValue';

/*
  BlogSearch is dependent on the SearchBar component,
  which updates the redux blogs state based on search keywords.
*/
class BlogSearch extends Component{
  constructor(props){
    super(props);

    this.state = { noInitialResults: false,
                   searchTerm: getQueryParamValue('search'),
                   page: Number(getQueryParamValue('page')) }//this.parseQueryStringAndGetPage() }//(new URLSearchParams(window.location.search)).get('page')}
  }

  // sets the search term of the initial search
  componentDidMount(){
    const {blogs} = this.props,
          page = Number(getQueryParamValue('page')) || 1;

    if(blogs){
      this.setState({ searchTerm: blogs.searchTerm,
                      noInitialResults: blogs.count === 0,
                      page });
    }else{
      const search = getQueryParamValue('search');
      this.props.getBlogs({ search,
                            page,
                            ordering: '-created'});
    }
  }



  componentDidUpdate(prevProps){
    const page = getQueryParamValue('page');
    if(this.state.page !== page){
      this.setState({page});
      this.props.getBlogs({user: this.state.user,
                           page,
                           ordering: '-created'});
    }
  }

  // the acquired set of blogs is in the results property of blogs prop
  render(){
    const {blogs} = this.props,
          page = Number(getQueryParamValue('page'));
    return blogs && (
      <React.Fragment>
        <SearchHeader page = {blogs.page}
                      count = {blogs.count}
                      searchTerm = {blogs.searchTerm}
                      type = "blogs"
                      noInitialResults = {blogs.noInitialResults} />
        <BlogList blogs={blogs.results} />
        <Pagination page = {page}
                    count = {blogs.count}
                    next = {blogs.next}
                    prev = {blogs.prev}
                    search = {blogs.searchTerm}
                    type = "blogs" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({blogs: state.blogs.blogs});
export default withRouter(connect(mapStateToProps, {getBlogs})(BlogSearch));
