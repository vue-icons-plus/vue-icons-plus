import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts';


export default defineConfig({
  plugins: [dts({
    outputDir: './build/lib'
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, `./src/index.ts`),
    },
    rollupOptions: {
      external: ['vue'],
      output: [{
        preserveModules: true,
        format: 'es',
        dir: path.resolve(__dirname, './build/lib'),
        entryFileNames: '[name].mjs',
        globals: {
          vue: 'Vue'
        }
      },
      {
        preserveModules: true,
        format: 'cjs',
        dir: path.resolve(__dirname, './build/lib'),
        entryFileNames: '[name].js',
        globals: {
          vue: 'Vue'
        }
      }]
    },
    emptyOutDir: true,
  },
})
