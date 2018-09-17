import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import DashboardUserPanel from './DashboardUserPanel';

class Dashboard extends Component {

  render() {
    return (
      <React.Fragment>
        <DashboardUserPanel />
        <Switch>
          <Route path = "/dashboard/blogs" component = {DashboardUserPanel}  />
        </Switch>
      </React.Fragment>
    );
  }

}

export default Dashboard;

//const mapStateToProps = (state) => ({ user: state.auth.user });

//export default connect(mapStateToProps)(Dashboard);
