import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ContributorPage from './pages/ContributorPage';
import About from './pages/About';
import GetInvolved from './pages/GetInvolved';
import Team from './pages/Team';
import { theme } from './theme';
import Footer from './components/Footer'; // Import the new Footer

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <Box display="flex" flexDirection="column" minH="100vh">
          <Router>
            <ScrollToTop />
            <Navbar />

            {/* Main content area. flex="1" pushes footer to bottom. */}
            <Box as="main" flex="1" minW={"100vw"} mt={16}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/contributor/:id" element={<Navigate relative="route" to="bio" replace />} />
                <Route path="/contributor/:id/:tab" element={<ContributorPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </Box>

            <Footer />
          </Router>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;