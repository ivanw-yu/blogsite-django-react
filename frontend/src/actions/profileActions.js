import axios from 'axios';
import { GET_PROFILE,
         GET_PROFILE_LIST,
         GET_ERRORS,
         GET_SUCCESS_MESSAGE } from './types';

import authenticationHeaders from '../utils/authenticationHeaders';

export const getProfile = (userId) => async dispatch => {
  try{
    const response = await axios(`/api/users/${userId}/`);
    dispatch({type: GET_PROFILE,
              payload: response.data});
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const editProfile = (profile, history) => async dispatch => {
  try{
    const response = await axios.patch(`/api/profiles/${profile.id}/`,
                                        { profile },
                                        authenticationHeaders);

    dispatch({ type: GET_SUCCESS_MESSAGE,
               payload: { successMessage: "Profile successfully updated." } });
    history.push('/dashboard');
  }catch(error){
    dispatch({ type: GET_ERRORS,
               payload: {error}});
  }
}
