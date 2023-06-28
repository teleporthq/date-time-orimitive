import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/date-time.ts'),
      name: 'DateTimePrimitive',
      fileName: 'default/lib',
      formats: ['umd', 'es', 'cjs'],
    },
  },
})
