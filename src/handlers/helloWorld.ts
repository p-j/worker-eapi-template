import { RequestContext } from '../types'

export function helloWorld({
  event,
  request,
  params,
}: RequestContext): Response {
  return new Response(`Hello ${event.request.method} World!`)
}
