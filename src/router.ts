import { Router } from 'tiny-request-router'
import { helloWorld } from './handlers/example'
import { withCache } from '@p-j/eapi-middleware-cache'
import { applyMiddlewares } from '@p-j/eapi-util-applymiddlewares'

const TTL_30MINUTES = 60 * 30

/**
 * Route definitions
 *
 * Here, for demo purpose we use tiny-request-router but you can swap that to any other router implementation
 * The important part is being able to match a request with a route through a matcher function (see ./index.ts)
 *
 * To learn more about the withCache middleware
 * @see https://github.com/p-j/eapi/tree/main/packages/eapi-middleware-cache
 * To learn more about the applyMiddlewares utility
 * @see https://github.com/p-j/eapi/tree/main/packages/eapi-util-applymiddlewares
 */
export const router = new Router()
router.all(
  '/',
  applyMiddlewares(
    helloWorld,
    withCache({
      cacheControl: `public, max-age=${TTL_30MINUTES}`,
      cdnTtl: TTL_30MINUTES,
    }),
  ),
)
