import { Router, Method } from 'tiny-request-router'
import { FetchEventHandler, Middleware, RequestContext, RequestHandler } from './types'
import { router } from './router'
import { applyMiddlewares } from './middlewares/_utils'
import { withErrorHandler } from './middlewares/errorHandler'
import { withMaintenance } from './middlewares/maintenance'

export interface EventHandlerFactoryOptions {
  router: Router
  originless?: boolean
  middlewares?: Middleware[]
}

/**
 * Fetch Event Handler Factory
 * This reusable factory can be used in a multi-router setup, especially if you combine originless routes with traditional routes on the same project
 * @param options
 * @param options.router the router instance to use for the eventHandler
 * @param options.originless whether or not the eventHandler has an origin to default to. Defaults to false.
 * @param options.middlewares an array of Middleware to be applied to every RequestHandler
 * @returns the eventHandler for the given configuration
 */
export function eventHandlerFactory({
  router,
  originless = false,
  middlewares = [],
}: EventHandlerFactoryOptions): FetchEventHandler {
  /**
   * Event Handler
   * Passes the RequestContext to the RequestHandler if a route is matched
   * continue to the origin otherwise, unless it's an originless setup
   * @param event the original FetchEvent received by the worker
   * @returns the final response (or promise of response) to be sent to the client
   */
  return async function eventHandler(event) {
    const { pathname } = new URL(event.request.url)
    const match = router.match(event.request.method as Method, pathname)
    const ctx: RequestContext = { event, request: event.request, params: (match && match.params) || {} }
    return match
      ? applyMiddlewares(
        match.handler as RequestHandler,
        ...middlewares,
      )(ctx)
      : originless
        ? new Response('Not Found', { status: 404 })
        : fetch(event.request)
  }
}

export const fetchEventHandler = eventHandlerFactory({
  router,
  originless: true,
  middlewares: [withErrorHandler(), withMaintenance()],
})

addEventListener('fetch', (event) =>
  event.respondWith(fetchEventHandler(event)),
)
