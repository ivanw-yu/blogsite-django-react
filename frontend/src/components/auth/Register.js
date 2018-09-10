import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TextInputGroup from '../commons/TextInputGroup';
import {registerUser} from '../../actions/authActions';

// const fields = [
//   {type: 'text',
//    name: 'name' },
//   {type: 'text',
//    name: 'email'},
//   {type: 'password',
//    name: 'password'},
//   {type: 'password',
//    name: 'password2'}
// ];

class Register extends Component{

  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const { errors } = nextProps;
    if(errors){
      this.setState({errors});
    }
  }

  render(){
    const { errors } = this.state;

    return (
      <div className = "form-box" >
      <h1> Sign Up </h1>
      <p> Please fill the required fields to create your account </p>
      <form onSubmit = {this.onSubmit} >

        <TextInputGroup name = "name"
                        type = "text"
                        value = {this.state.name}
                        placeholder = "Your name"
                        label = "Name"
                        onChange = {this.onChange}
                        error = {errors && errors.name}
                        />

        <TextInputGroup name = "email"
                        type = "text"
                        value = {this.state.email}
                        placeholder = "Your email"
                        label = "Email"
                        onChange = {this.onChange}
                        error = {errors && errors.email}
                        />

        <TextInputGroup name = "password"
                        type = "password"
                        value = {this.state.password}
                        placeholder = "Your password"
                        label = "Password"
                        onChange = {this.onChange}
                        error = {errors && errors.password}
                        />

        <TextInputGroup name = "confirmPassword"
                        type = "password"
                        value = {this.state.confirmPassword}
                        placeholder = "Confirm password"
                        label = "Confirm Password"
                        onChange = {this.onChange}
                        error = {errors && errors.password2}
                        />
        <button className = "theme-button" > Submit </button>
      </form >
      </div>
    );
  }

  // dynamically set the state having the same name as the target
  // to have the value of that target.
  onChange(event){
    this.setState( { [ event.target.name ] : event.target.value } );
  }

  onSubmit(event){
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.registerUser(user, this.props.history);
  }

}

const mapStateToProps = (state) => ({errors: state.errors});

export default withRouter(connect( mapStateToProps,
                                   { registerUser })( Register ));
