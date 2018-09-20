import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBlogById } from '../../actions/blogActions';
import BlogDetail from './BlogDetail';

class BlogView extends Component{

  componentDidMount(){
    this.props.getBlogById(this.props.match.params.id);
  }

  render(){
    return this.props.blog && (
      <BlogDetail blog={this.props.blog}
                  user={this.props.user}/>
    );
  }

}

const mapStateToProps = (state) => ({blog: state.blogs.blog,
                                     user: state.auth.user });

export default connect(mapStateToProps,
                       { getBlogById })( BlogView );
