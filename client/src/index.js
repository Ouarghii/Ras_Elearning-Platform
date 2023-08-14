import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { render } from 'react-dom'; // Import `render` from react-dom
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

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

// Use the `render` function from react-dom
render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
