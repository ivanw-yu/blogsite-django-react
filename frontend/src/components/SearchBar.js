import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBlogs } from '../actions/blogActions';
import { getProfiles } from '../actions/profileActions';

class SearchBar extends Component{
  constructor(){
    super();
    this.state = {
      searchKey: '',
      category: 'Blogs'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event){
    this.setState({ [event.target.name] : event.target.value });
  }

  onSubmit(event){
    event.preventDefault();
    switch(this.state.category){
      case 'Blogs':
        this.props.getBlogs({search: this.state.searchKey});
        this.props.history.push(`/blogs?search=${this.state.searchKey}`);
        break;
      case 'Profiles':
        this.props.getProfiles({search: this.state.searchKey});
        this.props.history.push(`/profiles?search=${this.state.searchKey}`);
    }
  }

  render(){

    return (
      <div style = {{paddingTop: "15px",
                      width: "400px",
                      position: "relative"}}>
        <form onSubmit = {this.onSubmit}>
          <select className ="category"
                  name = "category"
                  onChange={ this.onChange }>
            <option name = "Blogs" default={true}>
              Blogs
            </option>
            <option name = "Profiles">
              Profiles
            </option>
          </select>

          <input className = "search-bar"
                 name="searchKey"
                 type="text"
                 onChange = {this.onChange} />
          <input type="submit"
                 className = "search-button"
                 value="Search"  />
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null,
                                  { getBlogs, getProfiles } )(SearchBar));
