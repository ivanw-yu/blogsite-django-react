import React, {Component} from 'react';
import {connect} from 'react';

import {getBlogs} from '../../actions/blogActions';

// must pass the blog page, next button to this component
// from the redux store.
class BlogPagination extends Component{
  constructor(){
    super();
    this.state = {
      count: this.props.count,
      next: this.props.next,
      previous: this.props.previous,
      page: new URLSearchParams(paramsString).get('page') || 1,
      buttons: Math.ceil(this.props.count / 9);
    }
  }

  render(){
    return (
      <div>

      </div>
    );
  }

  renderButtons(){

    for(let i = this.state.page; i < this.state.page +)
    // return this.state.buttons.map(e =)
  }
}

export default withRouter(connect(null, {getBlogs})(BlogPagination));
