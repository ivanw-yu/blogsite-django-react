import React, {Component} from 'react';
import {connect} from 'react-redux';

import { getProfile } from '../../actions/profileActions';
import DashboardEditProfile from './DashboardEditProfile';

class DashboardEditProfileArea extends Component{
  render(){
    return this.props.profile && (
      <div className = "dashboard-form-div">
        <h1> Edit Profile </h1>
        <br />
        <DashboardEditProfile profile={this.props.profile} />
      </div>
    );
  }

  componentDidMount(){
    this.props.getProfile(this.props.user.id);
  }

}

const mapStateToProps = (state) => ({ user: state.auth.user,
                                      profile: state.profiles.profile});
export default connect(mapStateToProps,
                       { getProfile })(DashboardEditProfileArea);
