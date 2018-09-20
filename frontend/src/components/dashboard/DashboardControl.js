import React, { Component } from 'react';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';

import DashboardBlogList from './DashboardBlogList';
import DashboardBlogFormArea from './DashboardBlogFormArea';
import DashboardBlogView from './DashboardBlogView';
// import { postBlog,
//          editBlog } from '../../actions/blogActions';

class DashboardControl extends Component{

  render(){
    return (
      <div className = "dashboard-control">
        <div className = "dashboard-control-navbar">
          <NavLink exact
                   to = "/dashboard" > Blogs </NavLink>
          <NavLink exact
                   to = "/dashboard/profile"> Profile </NavLink>
        </div>
        <div className = "dashboard-content">
          <Switch>
            <Route exact path = "/dashboard" component = { DashboardBlogList } />
            <Route exact path = "/dashboard/blogs/:id" component = { DashboardBlogView } />
            <Route exact path = "/dashboard/blogs/edit/:id" render = { () => < DashboardBlogFormArea edit = {true} /> } />
            <Route exact path = "/dashboard/blogs/create" render = { () => < DashboardBlogFormArea edit = {false} /> } />
          </Switch>
        </div>
      </div>
    );
  }

}

export default DashboardControl;
