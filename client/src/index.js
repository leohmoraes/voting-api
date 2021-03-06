import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import index from './store/index';

import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const appWithStore = (
  <Provider store={index}>
    <App />
  </Provider>
);

ReactDOM.render(appWithStore, document.getElementById('root'));
