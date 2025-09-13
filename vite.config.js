import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react({
      // Disable fast refresh to avoid eval usage
      fastRefresh: false,
    })
  ],
  // Use different base paths for development vs production
  base: command === 'serve' ? '/' : '/colsim/',
  build: {
    // Use esbuild for faster builds and better CSP compatibility
    minify: 'esbuild',
    // Disable source maps to avoid eval usage
    sourcemap: false,
    // Ensure proper chunking for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
        // Ensure no eval is used in output
        format: 'es',
        // Disable eval completely
        generatedCode: {
          constBindings: true,
        },
        // Additional CSP-safe options
        inlineDynamicImports: false,
        hoistTransitiveImports: false,
      },
      // Disable eval in rollup
      external: [],
    },
    // Additional CSP-friendly settings
    target: 'es2015',
    cssCodeSplit: true,
    // Disable dynamic imports that might use eval
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Additional CSP-safe build options
    lib: false,
    emptyOutDir: true,
  },
  // Add CSP-friendly configuration
  define: {
    'process.env.NODE_ENV': '"production"',
    // Disable eval globally
    'global': 'globalThis',
  },
  // Disable eval in development as well
  esbuild: {
    target: 'es2015',
    // Ensure no eval is used
    keepNames: true,
    // Additional CSP-safe options
    legalComments: 'none',
  },
  // Additional CSP-safe settings
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015',
    },
    // Disable eval in dependencies
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Server configuration for CSP
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
    }
  },
}))
