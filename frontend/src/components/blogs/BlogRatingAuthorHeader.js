import React from 'react';
import ProfileAvatar from '../profiles/ProfileAvatar';
export default ({author}) => {
  const { name, email, profile } = author;
  return ( <div className = "rating-author-div">
     { profile && ( <div className = "profile-avatar-div-sm">
                     <ProfileAvatar image = {profile.image} />
                    </div> ) }
     <p>{name} <br/> ({email})</p>
  </div>);
}
