import axios from 'axios';
import { GET_PROFILE,
         GET_PROFILE_LIST,
         GET_ERRORS } from './types';

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
