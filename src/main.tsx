import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';

// Build-time static-site generation and client hydration are both driven from
// this single entry. During `npm run dev` the app runs as a normal client
// rendered SPA; during `npm run build` every route in `routes` (plus the
// getStaticPaths entries) is pre-rendered to static HTML.
export const createRoot = ViteReactSSG({ routes });
