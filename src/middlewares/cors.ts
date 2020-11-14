import { ACCESS_CONTROL_ALLOW_HEADERS } from '../helpers/konstants'
import { Middleware } from '../types'

export interface CorsOptions {
  response: Response
  origin: string
  isOriginAllowed?: Function
}

/**
 * @param options
 * @param options.response response on which apply cors headers
 * @param options.origin origin to set for access-control-allow-origin
 * @param options.isOriginAllowed an optional function to validate the origin of the request
 * @returns a Response with CORS headers
 */
export function cors({ response, origin, isOriginAllowed }: CorsOptions): Response {
  if (typeof isOriginAllowed === 'function' && !isOriginAllowed(origin)) {
    return response
  }
  const responseWithCors = new Response(response.body, response)
  responseWithCors.headers.set('Access-Control-Allow-Origin', origin)
  responseWithCors.headers.set('Access-Control-Allow-Headers', ACCESS_CONTROL_ALLOW_HEADERS.join(', '))
  responseWithCors.headers.set('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, DELETE, PUT, PATCH')
  responseWithCors.headers.set('Access-Control-Max-Age', '86400')
  const vary = responseWithCors.headers.get('Vary')
  if (!vary || !vary.includes('Origin')) {
    responseWithCors.headers.append('Vary', 'Origin')
  }
  return responseWithCors
}

export function withCors({ isOriginAllowed }: { isOriginAllowed?: Function }): Middleware {
  return function _withCors(requestHandler) {
    return async function corsHandler({ event, request, params }) {
      const response = await requestHandler({ event, request, params })
      const origin = request.headers.get('Origin') || '*'
      return cors({ response, origin, isOriginAllowed })
    }
  }
}
