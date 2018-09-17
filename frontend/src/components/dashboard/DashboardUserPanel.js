import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProfile } from '../../actions/profileActions';

class DashboardUserPanel extends Component{

  componentDidMount(){
    this.props.getProfile(this.props.auth.user.id);
  }

  render(){
    const profile  = this.props.profile;

    return profile && (
      <div className = "left-full-panel dashboard-user-panel" >
        <ul>
          <li>
            <img src = { "/media/" + profile.profile.image }
                 className = "profile-pic"
                 alt = "No Image"/>
            { `${profile.name} (${profile.email})`}
          </li>
          <li>
            <u>Bio</u>
            <p>{profile.profile.bio}</p>
          </li>
        </ul>
        { profile ? profile.bio : ''}
        <div className = "image"></div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({ profile: state.profiles.profile,
                                      auth: state.auth });


export default connect( mapStateToProps,
                        { getProfile } )( DashboardUserPanel );
