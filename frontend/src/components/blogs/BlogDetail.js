import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BlogDetail extends Component{
  render(){
    const { blog } = this.props;
    return this.props.blog && (
      <div className = "blog-view">
        {this.renderControlLinks()}
        <h1> {blog.title} </h1>
        <div style={{width: "100%",
                     textAlign: "center"}} >
          {blog.image && <img src ={blog.image[0].image}
                              style={{height: "400px",
                                      width: "100%"}}/>}
        </div>
        <p>
          {blog.content}
        </p>
      </div>
    );
  }


  renderControlLinks(){
    const { blog, user } = this.props;
    return (user.id === blog.user) && this.props.history && (
      <div className = "blog-options">
        <button onClick={ () => { 
            this.props.history.push(`/dashboard/blogs/edit/${blog.id}`)
          }
        } >Edit</button>
        <button onClick={()=>{}}>Delete</button>
      </div>
    );
  }
}

export default withRouter(BlogDetail);
