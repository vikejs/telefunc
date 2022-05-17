export { addTelefuncMiddleware }

import { telefunc } from '../../server/telefunc'
import type { ViteDevServer } from 'vite'
import getRawBody from 'raw-body'

type ConnectServer = ViteDevServer['middlewares']
function addTelefuncMiddleware(middlewares: ConnectServer) {
  middlewares.use(async (req, res, next) => {
    if (res.headersSent) return next()
    const url = req.originalUrl || req.url
    if (url !== '/_telefunc') return next()
    const method = req.method!
    if (method.toLowerCase() !== 'post') return next()
    const body = String(await getRawBody(req))
    if (!url) return next()
    const httpResponse = await telefunc({
      url,
      method,
      body
    })
    const { statusCode, contentType } = httpResponse
    res.setHeader('Content-Type', contentType)
    res.statusCode = statusCode
    res.end(httpResponse.body)
  })
}
