import { Box, ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from '../components/Navbar';
import { PropsWithChildren } from 'react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: {
          500: {value: '#2196f3'},
        },
        secondary: {
          500: {value: '#f50057'},
        },
      },
    },
  },
})

const queryClient = new QueryClient()

function App({ children }: PropsWithChildren<{}>) {
  return (
      <ChakraProvider value={system}>
        <QueryClientProvider client={queryClient}>
          <Box minW={"100vw"}>
              <Navbar />
              {children}
          </Box>
        </QueryClientProvider>
      </ChakraProvider>
  );
}

export default App;
