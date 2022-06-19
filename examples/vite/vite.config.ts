import { telefunc } from 'telefunc/vite'
import type { UserConfig } from 'vite'

export default {
  plugins: [telefunc()],
  build: { target: 'esnext' }
} as UserConfig
