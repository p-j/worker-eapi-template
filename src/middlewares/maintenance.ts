import { IP_ALLOW_LIST } from '../helpers/konstants'
import { Middleware } from '../types'
declare const IS_MAINTENANCE: string

export function withMaintenance(): Middleware {
  return function _withMaintenance(requestHandler) {
    return function maintenanceHandler({ request, event, params }) {
      // Check for maintenance state & IP Whitelisting
      if (IS_MAINTENANCE === 'false' || IP_ALLOW_LIST.includes(request.headers.get('cf-connecting-ip') || '')) {
        return requestHandler({ request, event, params })
      } else {
        const modifiedHeaders = new Headers()
        modifiedHeaders.append('Pragma', 'no-cache')
        modifiedHeaders.append('Retry-After', '600')
        const accept = request.headers.get('Accept') || ''
        if (accept.startsWith('application') && accept.endsWith('json')) {
          // API
          return new Response(null, {
            status: 503,
            statusText: 'Service Unavailable',
            headers: modifiedHeaders,
          })
        }
        // SSR
        modifiedHeaders.set('Content-Type', 'text/html')
        return new Response(html, {
          status: 503,
          statusText: 'Service Unavailable',
          headers: modifiedHeaders,
        })
      }
    }
  }
}

export const html = `
<!doctype html>
<html>
  <head>
    <meta charset='utf-8' />
    <title>Site Maintenance</title>
    <style>
      body {
        text-align: center;
        padding: 150px;
      }

      .background { background-color: papayawhip }
      .content {
        color: black;
        padding-top: 1px;
        padding-bottom: 10px;
        padding-left: 100px;
        padding-right: 100px;
        border-radius: 15px;
      }

      h1 { font-size: 40pt;}
      body { font: 20px Helvetica, sans-serif; color: #333; }
      article { display: block; text-align: left; width: 75%; margin: 0 auto; }
    </style>
  </head>
  <body>
    <article>
      <div class="background">
        <div class="content">
          <h1>We will be back soon!</h1>
          <p>We're very sorry for the inconvenience but we are performing maintenance. Please check back soon...</p>
        </div>
      </div>
    </article>
  </body>
</html>
`
