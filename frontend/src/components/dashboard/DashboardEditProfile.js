import React, {Component} from 'react';
import {connect} from 'react-redux';

import { editProfile } from '../../actions/profileActions';
import TextInputGroup from '../commons/TextInputGroup';

class DashboardEditProfile extends Component{

  constructor(props){
    super(props);
    console.log("props", this.props)
    this.state = {
      bio: this.props.profile.profile.bio,
      image: this.props.profile.profile.image
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){

  }

  render(){
    return this.props.profile && (
      <form onSubmit = {this.onSubmit} >
      <div id = "preview">
          {this.state.image && (
              <img style = { { width: "300px",
                          height: "300px",
                          borderRadius: "50%"}}
                    src={this.state.image} />  )}
      </div>
        <input type = "file"
               name = "image"
               accept = "image/*" />
        <br />
        Bio
        <textarea value={this.state.bio}
                  className = "textarea-field"/>
        <button>Submit</button>
      </form>
    );
  }
}


// const mapStateToProps = (state) => (
//   {profile: state.profiles.profile,
//    user: state.auth.user}
// );
export default connect( null,
                        { editProfile })(DashboardEditProfile);
