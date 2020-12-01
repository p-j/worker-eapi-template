/**
 * This is an example middleware to showcase how to build reusable & configurable behaviors for
 * your request handlers
 * You can find some useful middlewares here: https://github.com/p-j/eapi
 * A more involved version of this middleware is available here: https://github.com/p-j/eapi/tree/main/packages/eapi-middleware-headers
 * With support for combining/overriding/removing headers both on the Request & the Response
 */
export function withHeader({ headers = {} }: { headers: { [key: string]: string } }): Middleware {
  return function _withHeader(requestHandler) {
    return async function withHeaderHandler(requestContext) {
      // Get the response, you could also use this opportunity to modify the request
      // adding an Authorization header for an external service or modifying the URL to a final one
      // that is hidden to the client
      const originalResponse = await requestHandler(requestContext)
      // Some properties of the Response instance are immutables, like headers, so we create a new one to be able to modify them
      // https://developers.cloudflare.com/workers/templates/pages/modify_res_props
      const finalResponse = new Response(originalResponse.body, originalResponse)
      // Add the new headers
      Object.entries(headers).forEach(([header, value]) => finalResponse.headers.append(header, value))
      return finalResponse
    }
  }
}
