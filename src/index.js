import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App.js';

ReactDOM.render(
  <React.StrictMode>
    <App ethereum={window.ethereum}/>
  </React.StrictMode>,
  document.getElementById('root')
);
