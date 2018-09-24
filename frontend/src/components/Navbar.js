import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';

// Auth redux state is passed to Navbar as props from
// parent component App.
class Navbar extends React.Component{

  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }
  // render(){
  //   return (
  //     <nav className="navbar navbar-default" style = {{backgroundColor: "#003366", color: "white"}} >
  //       <div className="container-fluid">
  //         <div className="navbar-header">
  //           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
  //             <span className="sr-only">Toggle navigation</span>
  //             <span className="icon-bar"></span>
  //             <span className="icon-bar"></span>
  //             <span className="icon-bar"></span>
  //           </button>
  //           <NavLink exact
  //                    to="/"
  //                    activeClassName="active">
  //               Home
  //           </NavLink>
  //         </div>
  //         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  //           <ul className="nav navbar-nav">
  //             <li><a routerLink = "/questions"
  //                   routerLinkActive = "active">Questions</a></li>
  //           </ul>
  //
  //           <form className="navbar-form navbar-left">
  //             <div className="form-group">
  //               <input name = "search" type="text" className="form-control" placeholder="Search" style = {{color: "black"}} />
  //             </div>
  //             <button className="btn btn-primary">Submit</button>
  //           </form>
  //           <ul className="nav navbar-nav navbar-right">
  //             <li>
  //               <NavLink to="/login"
  //                     activeClassName="active">
  //                     Login
  //               </NavLink>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   )
  // }

  logout(){
    this.props.logout(this.props.history);
  }
  render(){
    return ( <nav className = "navbar" >
              <div className = "navbar-left" >
                < NavLink exact
                          to = "/blogs">
                  Blogs
                </ NavLink >
                < NavLink exact
                          to = "/profiles">
                  Profiles
                </ NavLink >
              </div>
              <div className="navbar-left">
                < SearchBar />
              </div>
              <div className = "navbar-right" >
                { this.props.auth.isAuthenticated ?
                  ( <React.Fragment>
                      < NavLink exact
                                to = "/dashboard"
                                >
                        Dashboard
                      </ NavLink >
                      < button onClick={this.logout}>
                        Logout
                      </ button >
                    </React.Fragment>
                  )
                  : (
                    <React.Fragment>
                      < NavLink exact
                                to = "/login">
                        Login
                      </ NavLink >
                      < NavLink exact
                                to = "/register">
                        Sign Up
                      </ NavLink >
                    </React.Fragment>)
                }
              </div>
             </nav>
    )
  }
}

export default withRouter(connect(null, { logout })(Navbar));
// const mapStateToProps = (state) => ({auth: state.auth})
// export default connect(mapStateToProps)(Navbar);
