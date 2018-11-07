import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Store from './store';


const store = new Store();

ReactDOM.render(
  <Provider {...store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);


injectGlobal`
  html,body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
