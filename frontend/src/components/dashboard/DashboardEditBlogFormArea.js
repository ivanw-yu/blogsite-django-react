import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBlogById } from '../../actions/blogActions';
import DashboardBlogForm from './DashboardBlogForm';

class DashboardEditBlogFormArea extends Component {

  componentDidMount(){
    if(this.props.match.params.id && this.props.edit)
        this.props.getBlogById(this.props.match.params.id);
  }

  // componentDidUpdate will trigger when the request has been made
  // through action creator getBlogById in componentDidMount.
  // this will be used to check whether the user is editing a blog
  // that does not exist, or a blog not owned by the user, and if so,
  // user is redirected to their dashboard.
  componentDidUpdate(prevProps){

    const blogDoesNotBelongToUser = ( this.props.blog &&
                                       this.props.user &&
                                       this.props.blog.user !== this.props.user.id );

    const blogDoesNotExist = this.props.error !== null;
    if( blogDoesNotBelongToUser || blogDoesNotExist ){
         this.props.history.push("/dashboard");
    }
  }

  render(){
    return ( this.props.blog &&
      <div className = "dashboard-blog-form-area" >
            <DashboardBlogForm edit = {true}
                               blog = { this.props.blog } />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { blog: state.blogs.blog,
    user: state.auth.user,
    error: state.flashMessage.errorMessage }
);

export default withRouter( connect(mapStateToProps,
                                  { getBlogById } )( DashboardEditBlogFormArea ) );
