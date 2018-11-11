import React from 'react';

export default ({ title, image }) => (<div className = "blog-title-area">
    <h1> {title} </h1>
    <div style={{width: "100%",
                 textAlign: "center"}} >
      {image && <img src={image}
                     style={ { height: "400px",
                               width: "100%"} }/>}
    </div>
  </div>
)
