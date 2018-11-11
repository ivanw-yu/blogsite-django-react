import React from 'react';

export default ({author, date}) => (<div className = "blog-author-header">
    Written by {author.name} ({author.email}) | {date}
  </div>
);
