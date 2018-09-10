import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/profiles" component = {Profile}/>
            <Route path="/blogs" component = {BlogList} />
            <Route path="/blog" component = {Blog} />
            <Route path="/login" component = {Login} />
            <Route path="/register" component = {Register} />
            <Route path="" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
