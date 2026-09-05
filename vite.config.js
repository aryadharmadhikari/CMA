import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import galleryHandler from './api/gallery.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for local API handler
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-gallery',
        configureServer(server) {
          server.middlewares.use('/api/gallery', async (req, res) => {
            await galleryHandler(req, res);
          });
        }
      }
    ]
  };
});
