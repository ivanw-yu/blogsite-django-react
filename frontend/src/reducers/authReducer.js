import { REGISTER_USER,
         SET_CURRENT_USER } from '../actions/types';

// initial states for the auth application state.
const initialStates = {
  user: {},
  isAuthenticated: false
}

export default function(state = initialStates, action){
  switch(action.types){
    case SET_CURRENT_USER:
      return { ...state,
               user: action.payload,
               isAuthenticated: action.payload !== null &&
                                action.payload !== undefined &&
                                ( typeof action.payload === 'object' &&
                                Object.keys(action.payload).length > 0 ) };
    default:
      return state;
  }
}
