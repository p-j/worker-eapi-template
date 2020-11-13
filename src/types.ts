import { Params } from 'tiny-request-router'

/**
 * The context of the current request, including the full FetchEvent, the current Request and the Params matched by the Router if any
 */
export interface RequestContext {
  event: FetchEvent
  request: Request
  params: Params
}

/**
 * Responsible for providing the Response to a given RequestContext
 */
export interface RequestHandler {
  (context: RequestContext): Promise<Response> | Response
}

/**
 * Higher order functions that will wrap RequestHandlers with additional logic
 * Example: Error management, Cache handling
 */
export interface Middleware {
  (func: RequestHandler): RequestHandler
}

/**
 * A Middleware factory takes in options for the underlying Middleware function
 * Example:
 * - Cache settings for a Cache handling middleware.
 * - Transforms for a Redirect middleware.
 */
export interface MiddlewareFactory {
  (options?: unknown): Middleware
}

/**
 * A Transform takes in the RequestContext and returns a transformed Request
 */
export interface Transform {
  (context: RequestContext): Request
}

/**
 * Responsible for providing the Response to a given FetchEvent
 */
export interface FetchEventHandler {
  (event: FetchEvent): Response | Promise<Response>
}
