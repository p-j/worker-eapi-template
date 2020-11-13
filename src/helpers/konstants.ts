export const IP_ALLOW_LIST: Array<string> = []
export const DEFAULT_VARY_HEADERS: Array<string> = []

export const TTL_1MINUTE = 60
export const TTL_30MINUTES = TTL_1MINUTE * 30
export const TTL_1HOUR = TTL_1MINUTE * 60
export const TTL_12HOURS = TTL_1HOUR * 12
export const TTL_24HOURS = TTL_1HOUR * 24
export const TTL_48HOURS = TTL_1HOUR * 48
export const TTL_30DAYS = TTL_24HOURS * 30
export const TTL_60DAYS = TTL_24HOURS * 60
export const TTL_90DAYS = TTL_24HOURS * 90
export const TTL_1YEAR = TTL_24HOURS * 365

export const ACCESS_CONTROL_ALLOW_HEADERS = [
  'Accept',
  'Authorization',
  'Cache-Control',
  'Content-Type',
  'DNT',
  'If-Modified-Since',
  'Keep-Alive',
  'Origin',
  'User-Agent',
]
