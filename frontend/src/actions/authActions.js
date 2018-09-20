import axios from 'axios';
import { GET_ERRORS,
         REGISTER_USER,
         SET_CURRENT_USER,
         LOGOUT_USER } from './types';

const headers = {'Content-Type': 'application/json'};

export const registerUser = (userData, history) => async dispatch => {
  try{
    // make request to register user, user must have name, email, password1
    // and password2. Then, if no error, redirect to login page.
    //const headers = {'Content-Type': 'application/json'};
    const user = await axios.post('/api/users/',
                                     userData,
                                     headers);

    history.push('/login');
    // dispatch({ type: REGISTER_USER,
    //            payload: user });
  }catch(error){
    console.log("ERROR ERROR^^%%%!!!", error)
    dispatch({ type: GET_ERRORS,
               payload: error });
  }
}

export const loginUser = (userData) => async dispatch => {
  try{
    const response = await axios.post('/api/users/login/',
                            userData,
                            headers);

    console.log("RESPONSE: ", response);

    const { token, user } = response.data;


    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: SET_CURRENT_USER,
               payload: user });
  }catch(error){
    dispatch({ type: GET_ERRORS,
               payload: error });
  }
}

// to logout the user, the local storage will be cleared (user and token will
// be removed from there), and the redux store auth will be reset to its
// initial state with isAuthenticated set to false, and user being an empty object.
// the logged out user is then redirected to the login page.
export const logout = (history) => dispatch => {
  localStorage.clear();
  dispatch({ type: LOGOUT_USER });
  history.push('/login');
}
