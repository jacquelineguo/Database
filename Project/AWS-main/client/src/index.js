import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

// create the store to store all states
// and apply the 'reduxThunk' middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// boot up the App component
// Provider tag is above the App component and contain the 'store'
// Porvider is used to inform the App the changes of states
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
