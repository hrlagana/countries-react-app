import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import client from './lib/apollo-client';
import { ApolloProvider } from '@apollo/client';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
