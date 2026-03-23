import { defineConfig, loadEnv } from 'vite';
import path from 'path'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      host: true
    },
  };
});