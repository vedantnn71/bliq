import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { ChakraProvider } from "@chakra-ui/react";
import theme from "ui/theme";
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
