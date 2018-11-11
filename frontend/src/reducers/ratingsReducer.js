import { GET_RATINGS } from '../actions/types';

const initialState = {
  ratings: null,
  rating: null
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_RATINGS:
      console.log('GET_RATINGS')
      return { ...state,
               ...action.payload};
    default:
      return state;
  }

}
