import {combineReducers} from 'redux';
import profilesReducer from './profilesReducer';
import blogsReducer from './blogsReducer';
import authReducer from './authReducer';
import flashMessageReducer from './flashMessageReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  blogs: blogsReducer,
  flashMessage: flashMessageReducer
});

export default rootReducers;
