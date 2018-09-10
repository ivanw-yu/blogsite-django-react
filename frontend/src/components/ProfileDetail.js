import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getProfile} from '../actions';

class ProfileDetail extends Component{

  componentWillMount(){
    this.props.getProfile(this.props.match.params.id);
  }

  render(){
    const profile = this.props.profile;
    return <div> {profile.bio} ProfileDetail</div>;
  }
}

function mapStateToProps(state){
  return {profile: state ? state.profile : null};
}

export default withRouter(connect(mapStateToProps,
                                  {getProfile})(ProfileDetail));
