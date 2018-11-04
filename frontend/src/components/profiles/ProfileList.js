import React, {Component} from 'react';

import ProfileCard from './ProfileCard';

export default ({ profiles }) => (
    <div className = "profile-list">
      { profiles instanceof Array && profiles.map( profile => <ProfileCard profile = {profile}
                                     key={profile.id}/> ) }
    </div>
  );
