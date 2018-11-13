import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers'

const initialStates = {};
const middleware = [thunk];

var isChrome = (( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) &&
                ( navigator.vendor.toLowerCase().indexOf("google") > -1 ) );

let store;
if(isChrome){
  // createStore's parameters are: reducers, initial states, middleware passed to applyMiddleware
  // the 2nd argument of compose() will allow the Chrome Redux Extension to run.
  store = createStore(rootReducers,
                            initialStates,
                            compose(applyMiddleware(...middleware),
                                    window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                    window.__REDUX_DEVTOOLS_EXTENSION__()))
}else{
  store = createStore( rootReducers,
                       initialStates,
                       applyMiddleware(...middleware) );
}

export default store;
