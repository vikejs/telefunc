import { NUXT_APP_IS_READY } from './NUXT_APP_IS_READY'

export default {
  modules: ['telefunc/nuxt', sendServerIsReadyMessage],
  telemetry: false,
}

// `libframe/test` cannot intercept Nuxt logs; we need to use a custom
// message to signal `libframe/test` when the build is finished.
function sendServerIsReadyMessage() {
  this.nuxt.hook('build:done', () => {
    process.stdout.write(`\n${NUXT_APP_IS_READY}\n`)
  })
}