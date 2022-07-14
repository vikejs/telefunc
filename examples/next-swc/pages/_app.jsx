import { telefuncConfig } from 'telefunc/client'

const isBrowser = typeof window !== 'undefined'
if (isBrowser) {
  telefuncConfig.telefuncUrl = '/api/_telefunc'
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
