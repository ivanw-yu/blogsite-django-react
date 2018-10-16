import React, {Component} from 'react';
import {connect} from 'react-redux';

import BlogList from '../blogs/BlogList';
import Pagination from '../commons/Pagination';
import { getBlogs } from '../../actions/blogActions';

class DashboardBlogList extends Component {

  componentDidMount(){
    console.log("id: ", this.props.auth.user.id);
    const query = { user: this.props.auth.user.id,
                    page: 1,
                    ordering: '-created' }
    this.props.getBlogs(query);
  }

  render(){
    const { blogs } = this.props;
    console.log("DashboardBlogList blogs:", this.props.blogs)
    return blogs && (
        <React.Fragment>
          <BlogList blogs = {blogs.results} />
          <Pagination page = {blogs.page}
                          count = {blogs.count}
                          next = {blogs.next}
                          prev = {blogs.prev}
                          inDashboard = {true}
                          user = {this.props.auth.user.id}
                          type = "blogs" />
        </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => ({ blogs: state.blogs.blogs,
                                      auth: state.auth });

export default connect( mapStateToProps,
                        { getBlogs } )( DashboardBlogList );
