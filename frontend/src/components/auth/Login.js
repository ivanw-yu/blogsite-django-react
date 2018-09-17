import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';
import TextInputGroup from '../commons/TextInputGroup';

class Login extends Component{

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth && nextProps.auth.isAuthenticated){
      console.log("login success", nextProps);
       this.props.history.push('/dashboard');
    }
    if(nextProps.auth && nextProps.errors){
      this.setState({ errors: nextProps.errors });
    }
  }

  render(){
    return (
      <div className = "form-box-background" >
        <div className = "form-box">
          <h1> Login </h1>
          <p> Please enter your email and password to access your account. </p>
          <form onSubmit = { this.onSubmit } >
            <TextInputGroup name = "email"
                            type = "text"
                            placeholder = "Email"
                            value = { this.state.email }
                            onChange = { this.onChange }
                            label = "Email"
                            />
            <TextInputGroup name = "password"
                            type = "password"
                            placeholder = "Password"
                            value = { this.state.password }
                            onChange = { this.onChange }
                            label = "Password"
                            />
            <button className = "theme-button"> Submit </button>
          </form>
        </div>
      </div>
    );
  }

  onChange(event){
    this.setState({ [event.target.name] : event.target.value });
  }

  onSubmit(event){
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }
}

const mapStateToProps = (state) =>
  ({ auth: state.auth,
     errors: state.errors });

export default withRouter( connect( mapStateToProps,
                                   { loginUser } )( Login ) );
