import React, {Component} from 'react';

import ProfileCard from './ProfileCard';

export default ({ profiles }) => (
    <div className = "blog-list">
      { profiles instanceof Array && profiles.map( profile => <ProfileCard profile = {profile}
                                     key={profile.id}/> ) }
    </div>
  );



// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {getProfiles} from '../../actions/profileActions';
//
// class ProfileList extends Component{
//
//   componentWillMount(){
//     this.props.getProfiles();
//   }
//
//   render(){
//     console.log("profile list",this.props.profiles);
//     console.log(this.props.profiles instanceof Array)
//     // {this.renderProfileList()}
//     return <div>ProfileList</div>;
//   }
//
//   renderProfileList(){
//     return this.props.profiles.map( profile => {
//       return <div>{profile.bio}</div>
//     });
//   }
// }
//
// const mapStateToProps = (state) => ({profiles: state.profiles})
//
// export default connect(mapStateToProps, {getProfiles})(ProfileList);
