import type { RouteRecord } from 'vite-react-ssg';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import PreviewBanner from './components/PreviewBanner';
import Footer from './components/Footer';
import { initPreviewMode } from './lib/sanity';
import { theme } from './theme';
import * as sample from './data/sampleData';
import { fetchProjects, fetchCategories, fetchContributors } from './lib/queries';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import ContributorPage from './pages/ContributorPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Publications from './pages/Publications';

// Reads the ?preview= param once on load, before anything fetches data.
// Safe on the server: initPreviewMode guards on `window`.
initPreviewMode();

const queryClient = new QueryClient();

/** Scrolls to the top of the page on every client-side navigation. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Shared application shell: providers, chrome (navbar/footer) and the routed
 * page outlet. Used as the layout route so every page shares it.
 */
function Layout() {
  return (
    <ChakraProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <Box display="flex" flexDirection="column" minH="100vh">
          <ScrollToTop />
          <PreviewBanner />
          <Navbar />
          <Box as="main" flex="1" minW={'100vw'} mt={16}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/App.tsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      {
        path: 'projects/:categoryId',
        element: <Projects />,
        getStaticPaths: async () => {
          try {
            const cats = await fetchCategories();
            if (cats?.length) return cats.map((c) => `projects/${c.id}`);
          } catch { /* fall back to sample data below */ }
          return sample.categories.map((c) => `projects/${c.id}`);
        },
      },
      {
        path: 'project/:id',
        element: <ProjectPage />,
        getStaticPaths: async () => {
          try {
            const projects = await fetchProjects();
            if (projects?.length) return projects.map((p) => `project/${p.id}`);
          } catch { /* fall back to sample data below */ }
          return sample.projects.map((p) => `project/${p.id}`);
        },
      },
      {
        path: 'contributor/:id',
        element: <Navigate relative="route" to="bio" replace />,
      },
      {
        path: 'contributor/:id/:tab',
        element: <ContributorPage />,
        getStaticPaths: async () => {
          try {
            const people = await fetchContributors();
            if (people?.length) {
              return people
                .filter((c) => c.id && c.id !== 'test' && c.role !== 'External Collaborator')
                .map((c) => `contributor/${c.id}/bio`);
            }
          } catch { /* fall back to sample data below */ }
          return sample.contributors
            .filter((c) => c.id !== 'test' && c.role !== 'External Collaborator')
            .map((c) => `contributor/${c.id}/bio`);
        },
      },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'team', element: <Team /> },
      { path: 'publications', element: <Publications /> },
    ],
  },
];

export default routes;
