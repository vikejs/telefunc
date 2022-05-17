export { devConfig }

import type { Plugin } from 'vite'
import { apply, addTelefuncMiddleware } from '../utils'

function devConfig(): Plugin[] {
  return [
    {
      name: 'telefunc:devConfig',
      apply: apply('dev'),
      config: () => ({
        ssr: { external: ['telefunc'] },
        optimizeDeps: {
          /*
          exclude: [
            'telefunc/client',
            '@brillout/libassert',
            '@brillout/json-s',
            '@brillout/json-s/parse',
            '@brillout/json-s/stringify'
          ]
          //*/
        }
      })
    },
    {
      name: 'telefunc:devConfig:middleware',
      apply: apply('dev', { skipMiddlewareMode: true, onlyViteCli: true }),
      configureServer(server) {
        addTelefuncMiddleware(server.middlewares)
      }
    }
  ]
}
