import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Replaces %VITE_SITE_URL% in index.html so Open Graph tags get absolute URLs.
const siteUrlPlugin = (siteUrl) => ({
  name: 'site-url-html',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), siteUrlPlugin(env.VITE_SITE_URL || '')],
    server: {
      port: 5173,
      proxy: { '/api': { target: env.VITE_DEV_API_TARGET || 'http://localhost:5000', changeOrigin: true } },
    },
    test: { environment: 'node' },
  };
});
