import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { PopupComponent } from './popup';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#20274e' },
    secondary: { main: '#525ea1' }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <PopupComponent />
  </ThemeProvider>,
  document.getElementById('root')
);
