import React from 'react';

export default ({author}) => {
  const { name, email } = author;
  return ( <div> {name} ({email}) </div>);
}
