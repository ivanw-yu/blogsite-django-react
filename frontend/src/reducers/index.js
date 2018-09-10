import {combineReducers} from 'redux';
import profilesReducer from './profilesReducer';
import blogsReducer from './blogsReducer';
import authReducer from './authReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  blogs: blogsReducer
});

export default rootReducers;
