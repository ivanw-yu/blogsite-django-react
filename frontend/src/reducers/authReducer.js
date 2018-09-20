import { REGISTER_USER,
         SET_CURRENT_USER,
         LOGOUT_USER } from '../actions/types';

// initial states for the auth application state.
const initialState = {
  user: {},
  isAuthenticated: false
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      console.log("SET_CURRENT_USER payload", action.payload);
      return { ...state,
               user: action.payload,
               isAuthenticated: action.payload !== null &&
                                action.payload !== undefined &&
                                ( typeof action.payload === 'object' &&
                                Object.keys(action.payload).length > 0 ) };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
