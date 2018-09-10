import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import ProfileDetail from './ProfileDetail';
import ProfileList from './ProfileList';
import {getProfile} from '../actions';

class Profile extends Component{

  render(){
    return  <div>
              <Route exact path = "/profiles/" render = {() => <ProfileList />} />
              <Route exact path = "/profiles/:id" render = {() => <ProfileDetail />} />
            </div>;
  }


}

export default Profile;
// const mapStateToProps = (state) => {
//   profile: state.profile//,
//   //profiles: state.profiles
// }
// export default connect(mapStateToProps, {getProfile})(Profile);
