import { Box, ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import ProjectPage from '../pages/ProjectPage';
import ContributorPage from '../pages/ContributorPage';
import { PropsWithChildren } from 'react';
import { Outlet } from '@remix-run/react';

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
            <Outlet />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
