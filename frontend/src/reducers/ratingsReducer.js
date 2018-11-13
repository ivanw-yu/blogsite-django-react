import { GET_RATINGS,
         RESET_RATINGS } from '../actions/types';

const initialState = {
  ratings: null,
  rating: null
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_RATINGS:

      // allows scrollable pagination for ratings.
      const ratings = action.payload.ratings;
      return { ...state,
               ratings: state.ratings ? state.ratings.concat(ratings) : ratings };
    case RESET_RATINGS:
      return initialState;
    default:
      return state;
  }

}
