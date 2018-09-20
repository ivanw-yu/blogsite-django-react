import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/Home';
import Profile from './components/Profile';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import BlogView from './components/blogs/BlogView';
import FlashMessage from './components/flashMessage/FlashMessage';
import PrivateRoute from './components/auth/PrivateRoute';

// used to check whether the token and user in the localStorage
// corresponds to each other.
import validateToken from './utils/validateToken';
import { SET_CURRENT_USER } from './actions/types';
import store from './store';

// Checks if token and user stored in the localStorage
// are valid. If so, set the user again on the redux state.
// This will prevent the redux state from reseting when
// the page is refreshed, or the page is visited on another tab.
if( localStorage.getItem('token') && validateToken( localStorage.getItem('token'),
                   JSON.parse(localStorage.getItem('user')) ) ){
  store.dispatch( { type: SET_CURRENT_USER,
                    payload: JSON.parse(localStorage.user)  } );
} else {

}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar auth = {this.props.auth} />
          <FlashMessage />
          <Switch>
            <Route exact path="/profiles" component = {Profile}/>
            <Route exact path="/blogs" component = {BlogList} />
            <Route exact path="/login" component = {Login} />
            <Route exact path="/register" component = {Register} />
            <Route exact path = "/blogs/:id" component = {BlogView} />
            <Switch>
              <PrivateRoute path="/dashboard" component = {Dashboard} />
            </Switch>
            <Route path="" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth})
export default connect(mapStateToProps)(App);
