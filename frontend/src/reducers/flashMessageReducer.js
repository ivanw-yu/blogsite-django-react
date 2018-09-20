import { GET_SUCCESS_MESSAGE,
         GET_ERRORS } from '../actions/types';

const initialStates = {
  errorMessage: null,
  successMessage: null
};

export default function(state=initialStates, action){
  switch(action.type){
    case GET_SUCCESS_MESSAGE:
      return { errorMessage: null,
               successMessage: action.payload };
    case GET_ERRORS:
      return { errorMessage: action.payload,
               successMessage: null };
    default:
      return state;
  }
}
