import axios from 'axios';
import { GET_PROFILE,
         GET_PROFILE_LIST,
         GET_ERRORS,
         GET_SUCCESS_MESSAGE } from './types';

import authenticationHeaders from '../utils/authenticationHeaders';

const URI_PREFIX = '/api/profiles';

export const getUserAndProfileByUserId = (userId) => async dispatch => {
  try{
    const response = await axios(`/api/users/${userId}/`);
    dispatch({type: GET_PROFILE,
              payload: response.data});
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const getProfileByUserId = (userId) => async dispatch => {
  try{
    const response = await axios(`${URI_PREFIX}/?user=${userId}`);
    dispatch({ type: GET_PROFILE,
               payload: response.data })
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const getProfiles= (query) => async dispatch => {

  try{
    // Traverse the query object, create a query string
    // in the format key1=value1&key2=value2..
    // Object.keys makes an array of property names owned by the object only,
    // not inherited properties.
    const queryString = Object.keys(query)
                              .map( key => {
                                // trim the key, and replace spaces with | for regex searching
                                // on the backend.
                                return `${key}=${query[key].trim().replace(/[ ]+/, '|')}`
                              })
                              .join('&');
    console.log('queryString',queryString);

    // use /api/users instead in order to retrieve the name of user and email
    // as well as the profile.
    const response = await axios.get(`/api/users/?${queryString}`);
    dispatch({type: GET_PROFILE_LIST,
              payload: response.data});
  }catch (error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const getProfile = () => {}

export const editProfile = (profile, history) => async dispatch => {
  try{

    let prevProfile = await axios(`${URI_PREFIX}/${profile.id}/`);

    // if the previous image of the profile is the same as the image sent,
    // delete the image from the profile object, so it is not patched over
    // through the request.
    console.log("prevProfile", prevProfile)
    if(profile.image === prevProfile.image)
      delete profile.image;

    const response = await axios.patch(`${URI_PREFIX}/${profile.id}/`,
                                        profile,
                                        authenticationHeaders);
    console.log("RESPONSE", response.data)
    if(response.data.success){
      dispatch({ type: GET_SUCCESS_MESSAGE,
                 payload: { successMessage: "Profile successfully updated." } });
    }
    //history.push('/dashboard');
    //window.location.reload();
    window.location.href = '/dashboard'; // to reload and prevent using cache
  }catch(error){
    dispatch({ type: GET_ERRORS,
               payload: {error}});
  }
}
