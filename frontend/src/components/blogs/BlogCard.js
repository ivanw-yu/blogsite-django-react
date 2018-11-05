import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class BlogCard extends Component{

  onClick(id){
    this.props.history.push(`/blogs/${id}`)
  }

  render(){
    const { blog } = this.props;
    return blog && (
      <div className = "card-col">
        <div className = "card"
             key = { blog.id }
             onClick = { (e) => this.onClick(blog.id) }>
          { blog.image.length ? (
              <img src = {blog.image.length && blog.image[0].image}
               className = "card-image"/> )
             : ( <div className = "blog-card-image"
                      style={{height: "70%",
                              width: "100%"}}> {blog.title} </div> )
           }
          <div className = "card-info" >
              { blog.title }
              <p> By {blog.user.name} ({blog.user.email}) </p>
          </div>
        </div>
      </div>
    );
  }
}

// adds history to BlogCard props, which is used for
// programmatic navigation in a single page app.
export default withRouter(BlogCard);
