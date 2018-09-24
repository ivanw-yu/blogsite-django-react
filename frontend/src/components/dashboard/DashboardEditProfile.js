import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editProfile } from '../../actions/profileActions';
import TextInputGroup from '../commons/TextInputGroup';

class DashboardEditProfile extends Component{

  constructor(props){
    super(props);
    console.log("props", this.props)
    this.state = {
      bio: this.props.profile.bio,
      image: this.props.profile.image
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    const profile = {
      bio: this.state.bio,
      image: this.state.image,
      id: this.props.profile.id,
      userId: this.props.user.id
    };

    this.props.editProfile(profile, this.props.history);
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
               accept = "image/*"
               onChange={this.onImageChange} />
        <br />
        Bio
        <textarea value={this.state.bio}
                  name="bio"
                  className = "textarea-field"
                  onChange={this.onChange}/>
        <button>Submit</button>
      </form>
    );
  }

  onChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  onImageChange(event){
    const file = event.target.files[0];
    const fileReader = new FileReader();

    if(!file)
      return;

    fileReader.onload = (event) => {
      this.setState({image: event.target.result});
    }

    fileReader.readAsDataURL(file);
  }
}


// const mapStateToProps = (state) => (
//   {profile: state.profiles.profile,
//    user: state.auth.user}
// );
export default withRouter(connect( null,
                                  { editProfile })(DashboardEditProfile));
