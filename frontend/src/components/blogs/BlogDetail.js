import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BlogTitle from './BlogTitle';
import BlogContent from './BlogContent';
import BlogAuthorHeader from './BlogAuthorHeader';

class BlogDetail extends Component{
  render(){
    console.log("BLOG: ", this.props.blog);
    const { blog, author } = this.props;
    console.log("authour", author)
    return blog && author && (
      <div className = "blog-view">
        {this.renderControlLinks()}
        <BlogTitle title = {blog.title}
                   image = { blog.image && blog.image.length > 0 ?
                              blog.image[0].image
                             : null } />
        <BlogAuthorHeader author = {author}
                          date = {blog.created} />
        <BlogContent content = {blog.content} />
      </div>
    );
  }


  renderControlLinks(){
    return null;
    // const { blog, user } = this.props;
    // return (user.id === blog.user) && this.props.history && (
    //   <div className = "blog-options">
    //     <button onClick={ () => {
    //         this.props.history.push(`/dashboard/blogs/edit/${blog.id}`)
    //       }
    //     } >Edit</button>
    //     <button onClick={()=>{}}>Delete</button>
    //   </div>
    // );
  }
}

export default withRouter(BlogDetail);
