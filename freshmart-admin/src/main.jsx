import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", 
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <ApolloProvider>
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>
  </ApolloProvider>
</React.StrictMode>
)