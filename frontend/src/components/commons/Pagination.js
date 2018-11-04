import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';

import {getBlogs} from '../../actions/blogActions';

// must pass the blog page, next button to this component
// from the parent component accessing the redux store.
class Pagination extends Component{

  constructor(props){
    super(props);

    this.state = {
      count: this.props.count,
      next: this.props.next,
      previous: this.props.prev,
      page: this.props.page,//new URLSearchParams(window.location.pathname).get('page') || 1,
      buttons: this.getNumberOfButtons(this.props.count),//Math.ceil(this.props.count / 9),
      search: this.props.search,//Term,//new URLSearchParams(window.location.pathname).get('search') || '',
      user: this.props.user,
      numCurrentButtons: 5 // number of buttons per search result page is 5 at a time.
    }
  }

  getNumberOfButtons(count){
    return Math.ceil(count / 9);
  }

  componentDidUpdate(prevProps){
    const {search, blogPage, count} = this.props,
          buttons = this.getNumberOfButtons(count);

    // if the search keyword is changed, page should be reseted to 1.
    if(prevProps.search !== search){
      this.setState({search, page: 1, count, buttons});

    // if the blogPage isn't the same, update the state.
    }else if(prevProps.blogPage !== blogPage){
      //newState.blogPage = blogPage;
      this.setState({page: blogPage, count, buttons});

    // if the count isn't the same, (Ex: blog was deleted while the user was
    // searching), update the count and number of buttons of the local state.
    }else if(count !== prevProps.count){
      this.setState({count, buttons});
    }


  }

  // buttons are only rendered if there's more than 1 button.
  render(){
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
          lastPage = this.getLastPage(),
          startPage = this.getStartPage();

    for(let i = startPage; i <= lastPage; i++ )
      paginationButtons.push(i);

    return paginationButtons.map( page => (
        <button onClick = {e => this.navigate(page)}
                key = {page}
                className = { page === currentPage ? 'active-page' : ''} >
                {page}
        </button>
      )
    );
  }

  // gets the start of the range of pagination buttons. There will only be
  // 5 buttons at a time.
  getStartPage(){
    const { page: currentPage,
            numCurrentButtons,
            buttons } = this.state;

    // if the current page is page 1 or 2, the first button is for page 1.
    if(currentPage <= 2){
      return 1;
    }

    // if the current page is 3 or a later page, and the page is not the 2nd to last
    // or the last page, the first page in ther range of pagination buttons
    // will be 2 less than the current page.
    if(currentPage - 2 > 0 && currentPage + 2 <= buttons){
      return currentPage - 2;
    }

    // if the number of buttons is greater than or equal to 5,
    // compute the first page of the current page as 4 or 3 less than the current Page,
    // otherwise if the number of buttons is less than 5, keep the first button
    // as page 1.
    if(currentPage + 2 > buttons){
      return buttons > 5 ? currentPage - (5 - (buttons-currentPage))
                          : 1;
    }
  }

  // gets the last page in ther range of pagination buttons.
  getLastPage(){
    // the last page is either 2 more than the current page or the maximum number of page.
    const { page: currentPage,
            buttons,
            numCurrentButtons } = this.state,
          lastPage = currentPage > 2 ? Math.min(buttons, currentPage + 2)
                                     : Math.min(buttons, currentPage + (numCurrentButtons - currentPage) )
    return lastPage;

  }

  navigate(page){
    const {search} = this.props;
    if(this.props.type === 'blogs'){
      if( !this.props.inDashboard ){
        this.props.getBlogs({search, page});
      }else{
        this.props.getBlogs({user: this.state.user,
                             page,
                             ordering: '-created'});
      }
    }else if(this.props.type === 'profiles'){
      this.props.getProfiles({search, page});
    }
    this.setState({page});
  }

}

const mapStateToProps = (state) => ({ blogPage: state.blogs.blogs.page,
                                      profileSearchTerm: state.profiles.profiles.page });
export default withRouter(connect(mapStateToProps, {getBlogs})(Pagination));
