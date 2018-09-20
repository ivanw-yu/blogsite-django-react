import React, {Component} from 'react';

import BlogCard from './BlogCard';

export default ({ blogs }) => (
    <div className = "blog-list">
      { blogs.map( blog => <BlogCard blog = {blog}
                                     key={blog.id}/> ) }
    </div>
  );

// export default ({ blogs }) => blogs.map( blog => (
//   <div className = "box"
//        key={ blog.id } >
//     <img src = {`/media/${blog.image}`} />
//     <div className = {} />
//     { blog.title }
//   </div>
// ));
