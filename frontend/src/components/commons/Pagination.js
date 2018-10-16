import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';

import {getBlogs} from '../../actions/blogActions';

// must pass the blog page, next button to this component
// from the redux store.
class Pagination extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: this.props.count,
      next: this.props.next,
      previous: this.props.prev,
      page: new URLSearchParams(window.location.pathname).get('page') || 1,
      buttons: Math.ceil(this.props.count / 9),
      search: new URLSearchParams(window.location.pathname).get('search') || '',
      user: this.props.user
    }
  }

  render(){
    console.log("PAGINATION BUTTONS", this.renderButtons());
    const {buttons} = this.state;
    return ( buttons > 1 &&
      <div className = "pagination-buttons">
        {this.renderButtons()}
      </div>
    );
  }

  renderButtons(){
    // startPage and lastPage are set up such that there can only be a maximum of 5 buttons at a time.
    const {page: currentPage, buttons, search} = this.state,
          paginationButtons = [],
          lastPage = Math.min(buttons, ( currentPage - 2 > 0 ) ? currentPage + 2
                                             : currentPage + ( 5 - currentPage ) ),
          startPage = Math.max( 1, ( currentPage + 2 < buttons) ? currentPage-2
                                                                : currentPage - (currentPage + 4 - buttons));
    //console.log("PAGE: ", currentPage, "| BUTTONS: ", buttons);
    console.log("BUTTONS: ", buttons);
    for(let i = startPage; i <= lastPage; i++ )
      paginationButtons.push(i);

    return paginationButtons.map( page => (
        <button onClick = {e => this.navigate(page)}
                className = { page === currentPage ? 'active-page' : ''} >
                {page}
        </button>
      )
    );
    // return this.state.buttons.map(e =)
  }

  navigate(page){
    if(this.props.type === 'blogs'){
      if( !this.props.inDashboard ){
        const {search} = this.state;
        this.props.getBlogs({search, page});
        this.setState({page});
      }else{
        console.log("getBlogs as navigate")
        this.props.getBlogs({user: this.state.user,
                             page,
                             ordering: '-created'});
        this.setState({page});
      }
    }else if(this.props.type === 'profiles'){

    }
  }
}

/*
<NavLink  to = {`/blogs?search=${search}&page=${page}`}
          activeClassName="" >{page}</NavLink>
*/

export default withRouter(connect(null, {getBlogs})(Pagination));
