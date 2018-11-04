import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ProfileList from './ProfileList';
import Pagination from '../commons/Pagination';
import SearchHeader from '../commons/SearchHeader';

import {getProfiles} from '../../actions/profileActions';

/*
  ProfileSearch is dependent on SearchBar component, which changes
  the redux profiles state.
*/
class ProfileSearch extends Component{
  constructor(){
    super();
    this.state = { noInitialResults: false}
  }

  componentDidUpdate(prevProps){
    const {profiles} = this.props;

    // if the initial results has no blogs, get all the blogs instead,
    // and set the noInitialResults state to true. By setting it to true,
    // this ensures that any subsequent request for blogs does not happen due to
    // the count being 0.
    if(profiles && profiles.count === 0 && !this.state.noInitialResults){
      this.props.getProfiles({page: 1});
      this.setState({ noInitialResults: true });
    }
  }

  render(){
    const {profiles} = this.props;
    return profiles && (
      <React.Fragment>
        <SearchHeader page = {profiles.page}
                      count = {profiles.count}
                      searchTerm = {profiles.searchTerm}
                      type = "profiles"
                      noInitialResults = {this.state.noInitialResults}
        />
        <ProfileList profiles = {profiles.results} />
        <Pagination page = {profiles.page}
                    count = {profiles.count}
                    next = {profiles.next}
                    prev = {profiles.prev}
                    type = "profiles" />
      </React.Fragment>
    )
  }
}

// return this.props.profiles && (
//   <ProfileList profiles = {this.props.profiles.results} />
// );
const mapStateToProps = (state) => ({profiles: state.profiles.profiles});

export default withRouter(connect( mapStateToProps,
                                   {getProfiles})(ProfileSearch));
