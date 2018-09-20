import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import DashboardUserPanel from './DashboardUserPanel';
import DashboardControl from './DashboardControl';

class Dashboard extends Component {

  render() {
    return (
      <React.Fragment>
        <DashboardUserPanel />
        <DashboardControl />
      </React.Fragment>
    );
  }

}

export default Dashboard;

//const mapStateToProps = (state) => ({ user: state.auth.user });

//export default connect(mapStateToProps)(Dashboard);
