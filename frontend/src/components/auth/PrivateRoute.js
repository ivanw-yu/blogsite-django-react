import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




// The PrivateRoute takes must be passed a component and path
// props; auth is the state from the redux store.
const PrivateRoute = ({
  component: Component,
  path,
  auth,
  ...rest
}) => (
  < Route path = { path }
          render = { ( props ) => (
                auth && auth.isAuthenticated ?
                  ( < Component
                        { ...props }
                        /> )
                : ( < Redirect to = '/login' /> )
              )
          }
          { ...rest }
      />
    );

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
