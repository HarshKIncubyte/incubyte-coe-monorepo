import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode'
import './index.css'
import App from './App'
import client from './apollo/client'
import { UserProvider } from './context/UserContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
)
