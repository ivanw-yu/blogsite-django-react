import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
//import reduxPromise from 'redux-promise'
import thunk from 'redux-thunk';

import './index.css';
import rootReducers from './reducers'

import App from './App';

const initialStates = {};
const middleware = [thunk];
// createStore's parameters are: reducers, initial states, middleware passed to applyMiddleware
// the 2nd argument of compose() will allow the Chrome Redux Extension to run.
const store = createStore(rootReducers,
                          initialStates,
                          compose(applyMiddleware(...middleware),
                                  window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                  window.__REDUX_DEVTOOLS_EXTENSION__()))


// Passing in store as props to the Provider component,
// and having App component nested in it, will allow the store to be
// accessed throughout the App.
ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));
