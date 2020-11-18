/**
 * Example request handler function
 * It's purpose is to return a Response to a given Request
 * Middlewares are applied to a RequestHandler and can modify both the request & the response
 */
export function helloWorld({ event, request, params }: RequestContext): Response {
  return new Response(`Hello ${event.request.method} World!`)
}
