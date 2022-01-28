import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import { LoginContextProvider } from 'context/authContext/AuthContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2F49D0',
    },
  },
  typography: {
    h1: {
      color: '#242e4c',
      fontFamily: 'OpenSansBold',
      fontSize: '1.5rem',
      fontWeight: 'normal',
      margin: 0,
    },
    h2: {
      color: '#242e4c',
      fontFamily: 'OpenSansRegular',
      fontSize: '1.4rem',
      fontWeight: 'normal',
      margin: 0,
    },
    h3: {
      color: '#242e4c',
      fontFamily: 'OpenSansRegular',
      fontSize: '1.3rem',
      fontWeight: 'normal',
      margin: 0,
    },
    h4: {
      color: '#242e4c',
      fontFamily: 'OpenSansRegular',
      fontSize: '1rem',
      fontWeight: 'normal',
      margin: 0,
    },
    h5: {
      color: '#242e4c',
      fontFamily: 'OpenSansRegular',
      fontSize: '0.88rem',
      fontWeight: 'normal',
      margin: 0,
    },
    h6: {
      color: '#242e4c',
      fontFamily: 'OpenSansRegular',
      fontSize: '0.8rem',
      fontWeight: 'normal',
      margin: 0,
    },
    body1: {
      margin: 0,
      padding: 0,
      fontFamily: 'OpenSansRegular',
      fontSize: '.8rem',
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <LoginContextProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </LoginContextProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
