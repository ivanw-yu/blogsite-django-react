import {combineReducers} from 'redux';
import profilesReducer from './profilesReducer';
import blogsReducer from './blogsReducer';
import authReducer from './authReducer';
import ratingsReducer from './ratingsReducer';
import flashMessageReducer from './flashMessageReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  blogs: blogsReducer,
  flashMessage: flashMessageReducer,
  ratings: ratingsReducer
});

export default rootReducers;
