import React from 'react';

export default ({image}) => ( image ? ( <React.Fragment>
      <img src = { image }
       className = "profile-avatar-circular"/>
    </React.Fragment> )
    : ( <div style = {{ borderRadius: '50%',
                        backgroundColor: 'grey' }}
             className = "profile-avatar-circular" /> )
)
