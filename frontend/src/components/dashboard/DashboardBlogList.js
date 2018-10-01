import React, {Component} from 'react';
import {connect} from 'react-redux';

import BlogList from '../blogs/BlogList';
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
      <BlogList blogs = {blogs.results} />
    );
  }

}

const mapStateToProps = (state) => ({ blogs: state.blogs.blogs,
                                      auth: state.auth });

export default connect( mapStateToProps,
                        { getBlogs } )( DashboardBlogList );