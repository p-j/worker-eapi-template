import { Router } from 'tiny-request-router'
import { helloWorld } from './handlers/helloWorld'
import { TTL_30MINUTES } from './helpers/konstants'
import { withCache } from './middlewares/cache'
import { applyMiddlewares } from './middlewares/_utils'

/**
 * Route definitions
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
