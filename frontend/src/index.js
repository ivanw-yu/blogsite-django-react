import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import store from './store';

import App from './App';

// Passing in store as props to the Provider component,
// and having App component nested in it, will allow the store to be
// accessed throughout the App.
ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));
