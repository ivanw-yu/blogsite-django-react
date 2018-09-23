import React, { Component } from 'react';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';

import DashboardBlogList from './DashboardBlogList';
import DashboardBlogFormArea from './DashboardBlogFormArea';
import DashboardEditBlogFormArea from './DashboardEditBlogFormArea';
import DashboardCreateBlogFormArea from './DashboardCreateBlogFormArea';
import DashboardBlogView from './DashboardBlogView';
import DashboardEditProfileArea from './DashboardEditProfileArea';
// import { postBlog,
//          editBlog } from '../../actions/blogActions';

class DashboardControl extends Component{

  render(){
    return (
      <div className = "dashboard-control">
        <div className = "dashboard-control-navbar">

        </div>
        <div className = "dashboard-content">
          <Switch>
            <Route exact path = "/dashboard" component = { DashboardBlogList } />
            <Route exact path = "/dashboard/blogs/edit/:id" component = { DashboardEditBlogFormArea } />
            <Route exact path = "/dashboard/blogs/create" component = { DashboardCreateBlogFormArea } />
            <Route exact path = "/dashboard/profile/edit" component = { DashboardEditProfileArea } />
            <Route exact path = "/dashboard/blogs/:id" component = { DashboardBlogView } />
          </Switch>
        </div>
      </div>
    );
  }

}

export default DashboardControl;
