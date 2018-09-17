import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers'

const initialStates = {};
const middleware = [thunk];
// createStore's parameters are: reducers, initial states, middleware passed to applyMiddleware
// the 2nd argument of compose() will allow the Chrome Redux Extension to run.
const store = createStore(rootReducers,
                          initialStates,
                          compose(applyMiddleware(...middleware),
                                  window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                  window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store;
