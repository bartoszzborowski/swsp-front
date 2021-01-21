import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from 'stores';
import 'typeface-roboto';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const theme = createMuiTheme({
  // overrides: {
  //   MuiPaper: {
  //     root: {
  //       backgroundColor: '#f0f1f6',
  //     },
  //   },
  // },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </StylesProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
