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

export const editProfile = (profile, history) => async dispatch => {
  try{

    let prevProfile = await axios(`${URI_PREFIX}/${profile.id}/`);

    // if the previous image of the profile is the same as the image sent,
    // delete the image from the profile object, so it is not patched over
    // through the request.
    console.log("prevProfile", prevProfile)
    if(prevProfile.data.image === profile.image)
      delete profile.image;

    const response = await axios.patch(`${URI_PREFIX}/${profile.id}/`,
                                        profile,
                                        authenticationHeaders);
    dispatch({ type: GET_SUCCESS_MESSAGE,
               payload: { successMessage: "Profile successfully updated." } });
    history.push('/dashboard');
  }catch(error){
    dispatch({ type: GET_ERRORS,
               payload: {error}});
  }
}
