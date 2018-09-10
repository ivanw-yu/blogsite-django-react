import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component{

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
              <div className = "navbar-right" >
                < NavLink exact
                          to = "/login">
                  Login
                </ NavLink >
                < NavLink exact
                          to = "/register">
                  Sign Up
                </ NavLink >
              </div>
             </nav>
    )
  }
}

export default Navbar;
