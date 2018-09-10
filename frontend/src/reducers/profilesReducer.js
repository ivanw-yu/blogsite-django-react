import {GET_PROFILE,
        GET_PROFILE_LIST} from '../actions/types';

export default function(state = null, action){
  switch(action.type){
    case GET_PROFILE:
      return {...state,
              profile: action.payload};
    case GET_PROFILE_LIST:
      console.log("GETTING PROFILE LIST", action.payload);
      return {...state,
              profiles: action.payload};
    default:
      return state;
  }
}
