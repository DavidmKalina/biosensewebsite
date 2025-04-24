import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ContributorPage from './pages/ContributorPage';

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

function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Box minW={"100vw"}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              {/* ContributorPage handles both /contributor/:id and /contributor/:id/:tab */}
              <Route path="/contributor/:id" element={<Navigate relative="route" to="bio" replace />} />
              <Route path="/contributor/:id/:tab" element={<ContributorPage />} />
            </Routes>
          </Router>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
