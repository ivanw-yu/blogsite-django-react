import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBlogById } from '../../actions/blogActions';
import BlogDetail from '../blogs/BlogDetail';

class DashboardBlogView extends Component{

  componentDidMount(){
    this.props.getBlogById(this.props.match.params.id);
  }

  render(){
    return this.props.blog && (
      <div className = "blog-area">
        <div className = "blog-options-area">
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <BlogDetail blog={this.props.blog}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({blog: state.blogs.blog});

export default connect(mapStateToProps,
                       { getBlogById })( DashboardBlogView );
