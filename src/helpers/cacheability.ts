/**
 * Check if a request is cacheable
 * @param request 
 * @see https://w3c.github.io/ServiceWorker/#cache-addAll
 */
export function isCacheable(request: Request): boolean {
  const requestScheme = new URL(request.url).protocol.replace(':', '');
  return request.method === 'GET' && ['http', 'https'].includes(requestScheme)
}