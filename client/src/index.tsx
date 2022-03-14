import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import axios from './axiosInstance';

import { Provider } from 'react-redux'
import store from './state/store';

const token = localStorage.getItem('token');

if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

