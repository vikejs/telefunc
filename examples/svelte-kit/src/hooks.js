import cookie from 'cookie'
import { telefunc, provideTelefuncContext } from 'telefunc'

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	event.locals.user = cookies.user || { name: 'Elizabeth', id: 0 }
	
	if (event.request.url.endsWith('/_telefunc')) {
		provideTelefuncContext(event.locals)
		const body = await event.request.text()
		const method = event.request.method
		const url = event.request.url

		const httpResponse = await telefunc({ url, method, body })
		const { body: responseBody, statusCode, contentType } = httpResponse
		
		return new Response(responseBody, { headers: new Headers({ contentType }), status: statusCode })
	}

	const response = await resolve(event)
	return response
}

export function getSession(event) {
  return event.locals
}