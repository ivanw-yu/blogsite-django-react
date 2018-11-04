import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
  ProfileCard is dependent on ProfileList, which should provide the profile prop
  used by the ProfileCard.
*/
class ProfileCard extends Component{
  onClick(id){
    this.props.history.push(`/blogs/${id}`)
  }

  render(){
    const { profile } = this.props;
    return profile && (
      <div className = "card-col">
        <div className = "blog-card"
             key = { profile.id }
             onClick = { (e) => this.onClick(profile.id) }>
          { profile.image ? (
              <img src = { profile.image }
               className = "blog-card-image"/> )
             : ( <div className = "blog-card-image"
                      style={{height: "70%",
                              width: "100%"}}> No Image </div> )
           }
          <div className = "blog-card-info" >
              <h1>{ profile.name }</h1>
              <h2>{ profile.email } </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
