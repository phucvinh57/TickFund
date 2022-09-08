import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './scss/custom.scss'
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Protector from './Protector';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Protector>
          <App />
          <ToastContainer pauseOnHover={false}/>
        </Protector>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
