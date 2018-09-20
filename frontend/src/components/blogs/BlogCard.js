import React, {Component} from 'react';

export default ({ blog }) => (
  <div className = "card-col">
    <div className = "blog-card"
         key = { blog.id } >
      { blog.image.length ? (
          <img src = {blog.image.length && blog.image[0].image}
           className = "blog-card-image"/> )
         : ( <div className = "blog-card-image"
                  style={{height: "70%",
                          width: "100%"}}> {blog.title} </div> )
       }
      <div className = "blog-card-info" >
          { blog.title }
      </div>
    </div>
  </div>
);
