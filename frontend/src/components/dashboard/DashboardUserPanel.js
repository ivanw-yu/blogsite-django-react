import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
            <img src = { profile.profile.image }
                 className = "profile-pic"
                 alt = "No Image"/>
            { `${profile.name} (${profile.email})`}
          </li>
          <li>
            <u>Bio</u>
            <p>{profile.profile.bio}</p>
          </li>
        </ul>
        <div className = "dashboard-user-panel-links">
          <ul>
            <li>
              <NavLink exact
                       to = "/dashboard" >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink exact
                       to = "/dashboard/blogs/create" >
                Create Blog
              </NavLink>
            </li>
            <li>
              <NavLink exact
                       to = "/dashboard/profile/edit" >
                Edit Profile
              </NavLink>
            </li>
            <li>
              <NavLink exact
                       to = "/dashboard" >
                Edit Password
              </NavLink>
            </li>
          </ul>
        </div>
        { profile ? profile.bio : ''}
        <div className = "image"></div>
        <div className = "dashboard-user-panel-links">
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({ profile: state.profiles.profile,
                                      auth: state.auth });


export default connect( mapStateToProps,
                        { getProfile } )( DashboardUserPanel );
