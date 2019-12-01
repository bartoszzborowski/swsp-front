import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from 'stores';
import 'typeface-roboto';
import { StylesProvider } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  // overrides: {
  //   MuiSvgIcon: {
  //     root: {
  //       width: '1rem',
  //       height: '1rem',
  //     },
  //   },
  // },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
