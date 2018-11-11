import React from 'react';

export default ({image}) => ( image && ( <React.Fragment>
      <img src = { image }
       className = "card-image"/>
    </React.Fragment> );
)
