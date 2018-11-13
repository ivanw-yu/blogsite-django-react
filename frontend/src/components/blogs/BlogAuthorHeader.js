import React from 'react';

export default ({author, date}) => (<div className = "blog-author-header">
    { author.profile && <img src = {author.profile.image} /> }
    Written by {author.name} ({author.email}) | {date}
  </div>
);
