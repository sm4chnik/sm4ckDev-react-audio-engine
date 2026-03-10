import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'howler', 'zustand', '@sm4ckdev/audio-core', '@sm4ckdev/audio-connectors'],
})
