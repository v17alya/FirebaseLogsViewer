import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        mock: './index-mock.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
