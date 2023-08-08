import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  // Define your custom color scheme here
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    // Define your color scheme colors here
    brand: {
      50: '#F7FAFC',
      // ...
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
