import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router } from 'react-router-dom';
import 'moment/locale/zh-cn';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from './App';
import Store from './store';


const store = new Store();
const app = (
  <MuiThemeProvider theme={theme}>
    <Provider {...store}>
      <Router basename="/">
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));


  injectGlobal`
  html,body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *{
    box-sizing: border-box;
  }
  .flexRow { 
    display:flex;
    width: 100%;
    align-items: center;
    .itemFixed{
      flex: 0 0 auto;
    }
    .itemGrow{
      flex: 1 1 auto;
    }
  }
  .flexCol {
    display: flex;
    height: 100%;
    align-items: stretch;
    flex-direction: column;
    .itemFixed{
      flex: 0 0 auto;
    }
    .itemGrow{
      flex: 1 1 auto;
    }
  }
`;
