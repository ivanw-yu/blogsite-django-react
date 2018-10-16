import React, {Component} from 'react';
import {connect} from 'react-redux';

export default ({searchTerm, count, page, type, noInitialResults}) => (
  <h1>
    {  noInitialResults &&
        `No results found for
            search term '${searchTerm}',
            here are some blogs.` }
    <br />
    {`Showing ${ page * 9 - 8 + '-'+ Math.min(page * 9, count)}
      ${ type } of ${ count } ${ type }.`}
  </h1>
)
