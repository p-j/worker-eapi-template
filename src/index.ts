import { Router, Method } from 'tiny-request-router'
import { router } from './router'
import { withErrorHandler } from '@p-j/eapi-middleware-errorhandler'
import { fetchEventHandler } from '@p-j/eapi-util-fetcheventhandler'
import { withHeader } from './middlewares/example'
/**
 * Create a route matching function using a given router instance
 */
export function matcherFactory(router: Router): RouteMatcher {
  return function matcher(event) {
    const { pathname } = new URL(event.request.url)
    return (router as Router).match(event.request.method as Method, pathname)
  }
}

/**
 * Create a FetchEventHandler that will automatically handle origin(less) pass through & apply generic middlwares to all matched routes
 */
export const eventHandler = fetchEventHandler({
  matcher: matcherFactory(router),
  originless: true,
  middlewares: [withErrorHandler(), withHeader({ headers: { 'X-Custom': 'Value' } })],
})

/**
 * Handle incoming FetchEvent
 */
addEventListener('fetch', (event) => event.respondWith(eventHandler(event)))
