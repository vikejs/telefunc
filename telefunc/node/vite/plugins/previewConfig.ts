export { previewConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import { apply, addTelefuncMiddleware, assertPosixPath, assertUsage, getOutDirs, getOutDir } from '../utils'
import fs from 'fs'
import type { ViteDevServer } from 'vite'

type ConnectServer = ViteDevServer['middlewares']

function previewConfig(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:previewConfig',
    apply: apply('preview'),
    config(config) {
      const outDir = getOutDir(config)
      return {
        build: {
          outDir
        }
      }
    },
    configResolved(config_) {
      config = config_
      // @ts-ignore
      config.preview ??= {}
      config.preview.port ??= 3000
      if (process.env.CI && process.platform === 'darwin') {
        config.preview.host ??= true
      }
    },
    // @ts-ignore
    configurePreviewServer(server: { middlewares: ConnectServer }) {
      assertDist()
      addTelefuncMiddleware(server.middlewares)
    }
  }
  function assertDist() {
    const {
      build: { outDir }
    } = config
    assertPosixPath(outDir)
    let { outDirRoot, outDirClient, outDirServer } = getOutDirs(outDir)
    if (!outDirRoot.endsWith('/')) outDirRoot = outDirRoot + '/'
    assertUsage(
      fs.existsSync(outDirClient) && fs.existsSync(outDirServer),
      `Cannot run \`$ vite preview\`: your app wasn't built yet (the build directory \`${outDirRoot}\` is missing). Make sure to run \`$ vite build\` before running \`$ vite preview\`.`
    )
  }
}
