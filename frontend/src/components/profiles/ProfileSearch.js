import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ProfileList from './ProfileList';

/*
  ProfileSearch is dependent on SearchBar component, which changes
  the redux profiles state.
*/
class ProfileSearch extends Component{

  componentDidMount(){
    console.log("this.props.profiles: ",this.props.profiles);
  }

  render(){
    console.log("this.props.profiles: ",this.props.profiles);
    return this.props.profiles && (
      <ProfileList profiles = {this.props.profiles.results} />
    );
  }
}

// return this.props.profiles && (
//   <ProfileList profiles = {this.props.profiles.results} />
// );
const mapStateToProps = (state) => ({profiles: state.profiles.profiles});

export default withRouter(connect(mapStateToProps)(ProfileList));
