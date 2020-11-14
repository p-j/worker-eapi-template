import { fetchEventHandler } from '../src/index'
describe('handler returns response with request method', () => {
  const methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']
  methods.forEach((method) => {
    it(method, async () => {
      const request = new Request('/', { method })
      const event = new FetchEvent('fetch', { request })
      const response = await fetchEventHandler(event)
      const text = await response.text()

      // Test the helloWorld handler
      expect(response.status).toBe(200)
      expect(text).toBe(`Hello ${method} World!`)

      // Test that the withCache middleware is applied correctly
      if (method === 'GET') {
        expect(response.headers.get('Cache-Control')).toBe('public, max-age=1800')
      } else {
        expect(response.headers.get('Cache-Control')).toBe(null)
      }
    })
  })
})
